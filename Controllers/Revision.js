const Revision = require("../Models/Revision");
const RevisionChat = require("../Models/RevisionChat");
const { v4: uuidv4 } = require("uuid");
const Users = require("../Models/Users");
const getArrayOfMessages = require("../Utils/getArrayOfMessages");
const num_tokens_from_messages = require("../Utils/num_tokens_from_messages");
const moment = require("moment");
const gpt35 = require("../Utils/gpt");

require("dotenv").config();

console.log(process.env.OPENAI_API_KEY);

exports.startRevisionSession = async (req, res) => {
  try {
    const now = moment();
    const { classe, educationSystem, level, attributes, subject } = req.body;
    console.log(req.body);

    const messages = [
      {
        role: "system",
        //content:
        //"Vous êtes un assistant scolaire nommé Dister qui aide les élèves à réviser en répondant à leurs questions par rapport à leçon, leurs classes, leurs système scolaire et leurs niveau d'éducation. Lorsqu'un élève vous demande d'écrire une fiche de révision, résumé son cours, faites le prof en gros et répondez de manière direct en donnant directement la fiche de révision.",
        content:
          "Tu es un assistant utile, nommé Dister. Tu es ici pour aider l'utilisateur à créer une fiche de révision. Fournis des informations précises et détaillées pour aider l'utilisateur à comprendre et à retenir le sujet de sa révision.",
      },
      {
        role: "user",
        content: `Ecrit une fiche de révision assez long et consis tout en donnant un maximum de détail, en prenant en compte les paramètre suivant: 
        
        Classe: ${classe}
        Système d'éducation: ${educationSystem},
        Niveau d'éducation: ${level},
        Sujet: ${subject}
        ${attributes ? `Elements à inclure: ${attributes}` : null}
        `,
      },
    ];

    //console.log(JSON.stringify(messages));

    const [completion, tokens] = await gpt35(messages, 1, 3800);

    console.log(completion);
    const ID = uuidv4();

    const revisionToInsert = {
      id: ID,
      classe: classe,
      educationSystem: educationSystem,
      level: level,
      attributes: attributes,
      subject: subject,
      favorite: false,
      forgotten: false,
      tokenNbre: tokens,
      price: (tokens / 1000) * 0.002,
      created: now.unix(),
      userId: req.user.id,
    };

    await Users.updateOne({
      credits: req.user.credits - 1,
      creditsUsed: req.user.creditsUsed + 1,
    });

    await Revision.insertOne(revisionToInsert);

    const chatToInsert = {
      role: "system",
      content: messages[0].content,
      timestamp: now.unix(),
      revisionId: ID,
    };

    const chatToInsert2 = {
      role: "user",
      content: messages[1].content,
      timestamp: now.unix(),
      revisionId: ID,
    };

    const chatToInsert3 = {
      role: "assistant",
      content: completion,
      timestamp: now.unix(),
      revisionId: ID,
    };

    await RevisionChat.insertOne(chatToInsert);
    await RevisionChat.insertOne(chatToInsert2);
    await RevisionChat.insertOne(chatToInsert3);

    const user2send = await Users.findOne({ id: req.user.id });

    return res.status(200).json({
      success: true,
      user: {...user2send[0], password: undefined},
      revision: {
        ...revisionToInsert,
        chat: [chatToInsert, chatToInsert2, chatToInsert3],
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
};

exports.sendChat = async (req, res) => {
  try {
    const { chat } = req.body;
    const now = moment();
    let messages = await getArrayOfMessages(req.params.idRevision);

    const completionId = uuidv4();
    console.log(completionId);

    req.app
      .get("socketService")
      .broadcastEmiter(
        { userId: req.user.id, completionId: completionId },
        "chatCompletionId"
      );

    messages.push({
      role: "user",
      content: chat,
    });

    const [completion, token] = await gpt35(messages, 1, 3800, (data) => {
      let formattedData = data.replace(/\n/g, "<br />");
      req.app.get("socketService").broadcastEmiter(
        {
          userId: req.user.id,
          data: formattedData,
          completionId: completionId,
        },
        "chatCompletion"
      );
    });

    const chatToInsert = {
      role: "user",
      content: chat,
      timestamp: now.unix(),
      revisionId: req.params.idRevision,
    };

    const chatToInsert2 = {
      role: "assistant",
      content: completion,
      timestamp: now.unix(),
      revisionId: req.params.idRevision,
    };

    await RevisionChat.insertOne(chatToInsert);
    await RevisionChat.insertOne(chatToInsert2);

    await Revision.updateOne(
      {
        tokenNbre: token,
        price: (token / 1000) * 0.002,
      },
      { id: req.revision.id }
    );

    const revision = await Revision.findOne({ id: req.params.idRevision });
    const chats = await RevisionChat.findOne({
      revisionId: req.params.idRevision,
    });

    const user2send = await Users.findOne({ id: req.user.id });

    return res
      .status(200)
      .json({ user: {...user2send[0], password: undefined}, success: true, revision: { ...revision[0], chat: chats } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const revision = await Revision.findOne({ id: req.params.idRevision });
    let chats = await RevisionChat.findOne({
      revisionId: req.params.idRevision,
    });

    chats = chats.slice(2);

    const user2send = await Users.findOne({ id: req.user.id });

    return res
      .status(200)
      .json({ user: {...user2send[0], password: undefined,}, success: true, revision: { ...revision[0], chat: chats } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const revision = await Revision.customQuery(
      "SELECT * FROM revision WHERE userId = ? AND forgotten = 0",
      [req.user.id]
    );
    const user2send = await Users.findOne({ id: req.user.id });

    return res.status(200).json({ user: {...user2send[0], password: undefined},success: true, revision: revision });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const revision = await Revision.customQuery(
      "SELECT * FROM revision WHERE userId = ? AND forgotten = 0",
      [req.user.id]
    );

    await Revision.updateOne(
      { forgotten: true },
      { id: req.params.idRevision }
    );
    const user2send = await Users.findOne({ id: req.user.id });

    return res.status(200).json({ user:{...user2send[0], password: undefined}, success: true, revision: revision });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnue a eu lieu" });
  }
};
