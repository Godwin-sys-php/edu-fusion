const Users = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const Revision = require("../Models/Revision");
const ToolUsage = require("../Models/ToolUsage");
const RevisionToolUsage = require("../Models/RevisionToolUsage");
const tools = require("../Data/tools");
const nodemailer = require("nodemailer");

require("dotenv").config();

const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.signup = async (req, res) => {
  try {
    const { fname, lname, phoneNumber, email, password, why } = req.body;
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const newUser = {
      fname: fname.trim(),
      lname: lname.trim(),
      phoneNumber: phoneNumber,
      email: email.trim(),
      password: await bcrypt.hash(password, 10),
      created: moment().unix(),
      credits: 15,
      creditsUsed: 0,
      activate: true,
      plan: "trial",
      current_period_end: null,
      cancel_at_period_end: true,
      why: why,
      verified: true,
      codeSended: code,
      expiredTimestamp: moment().unix() + 900,
    };

    const inserted = await Users.insertOne(newUser);

    // await twilio.messages.create({
    //   body: `Votre code de confirmation Yuzi est: ${code}`,
    //   to: `${phoneNumber}`, // Text your number
    //   from: "+12562738311", // From a valid Twilio number
    // });
    console.log(code);
    return res.status(201).json({
      created: true,
      verified: true,
      user: { ...newUser, password: undefined | null, id: inserted.insertId },
      token: jwt.sign(
        { ...newUser, password: undefined | null, id: inserted.insertId },
        process.env.TOKEN,
        {
          expiresIn: 604800 * 7, // 7 weeks
        }
      ),
    });
  } catch (error) {
    console.log("ici");
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.verify = async (req, res) => {
  try {
    const { id, codeSupplied } = req.body;

    const user = await Users.findOne({ id: id });
    if (!user) {
      throw new Error();
    }
    console.log(user[0].codeSended);
    if (
      user[0].codeSended == codeSupplied &&
      moment().unix() <= user[0].expiredTimestamp
    ) {
      await Users.updateOne({ verified: true }, { id: id });
      return res.status(200).json({
        verified: true,
        user: { ...user[0], password: undefined | null, verified: true },
        token: jwt.sign(
          { ...user[0], password: undefined | null, verified: true },
          process.env.TOKEN,
          {
            expiresIn: 604800 * 30, // 7 weeks
          }
        ),
      });
    } else {
      return res.status(200).json({ verified: false, message: "Code expiré" });
    }
  } catch (error) {
    console.log("ici");
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.fpRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.customQuery(
      "SELECT * FROM users where email = ? AND notHere = 0",
      [email]
    );
    if (user.length === 0) {
      return res
        .status(400)
        .json({ notFound: true, message: "Adresse email introuvable" });
    }
    const token = jwt.sign(
      { ...user[0], password: undefined | null, },
      process.env.MAIL_TOKEN,
      {
        expiresIn: 900, // 15 minutes
      }
    )
    let transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465, // Utilisez le port 587 si vous ne souhaitez pas utiliser SSL
      secure: true, // true pour le port 465, false pour d'autres ports
      auth: {
        user: process.env.MAIL_LOGIN, // Remplacez par votre adresse e-mail
        pass: process.env.MAIL_PASS, // Remplacez par le mot de passe de votre e-mail
      },
    });
    let resetLink = "https://my.yuzi.app/reset-password/"+token;
    // Définissez les options pour l'e-mail
    let mailOptions = {
      from: "Yuzi <yuzi@corporus.net>", // Votre adresse e-mail
      to: email, // Adresse e-mail du destinataire
      subject: "Réinitialisation de votre mot de passe",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #1d1e30; color: white; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #25263a; padding: 20px; border-radius: 8px;">
              <h2>Réinitialisation de votre mot de passe</h2>
              <p>Bonjour,</p>
              <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Yuzi. Si vous n'avez pas fait cette demande, veuillez ignorer cet e-mail.</p>
              <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; border-radius: 5px; background-color: #007BFF; color: white; text-decoration: none; font-weight: bold; text-align: center;">Réinitialiser le mot de passe</a>
              <p style="margin-top: 20px;">Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
              <p><a href="${resetLink}" style="color: #00ccff;">${resetLink}</a></p>
              <p><strong>Notez que ce lien expire dans 15 minutes.</strong></p>
              <p>Merci d'utiliser Yuzi !</p>
              <p>L'équipe Yuzi</p>
          </div>
      </div>`,
    };

    // Envoyez l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ error: true, message: "Une erreur inconnu a eu lieu lors de l'envoie de l'email" });
      }
      return res.status(200).json({ emailSent: true, });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.fpApply = async (req, res) => {
  try {
    const {token, newPass} = req.body;
    jwt.verify(token, process.env.MAIL_TOKEN, async function(err, decoded) {      
			if (err) {
        return res.status(400).json({ invalidToken: true, message: "Votre lien a expiré, veuillez en créer un autre", })
			} else {
        const user = await Users.customQuery("SELECT * FROM users WHERE id = ? AND notHere = 0" ,[decoded.id]);
        if (user.length === 0) {
          return res.status(400).json({ invalidToken: true, message: "Votre lien a expiré, veuillez en créer un autre", })
        }
        const newPassword = await bcrypt.hash(newPass, 10);
        await Users.updateOne({ password: newPassword }, { id: decoded.id });
        return res.status(200).json({ update: true, })
			}
		})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
}

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    const user = await Users.customQuery(
      "SELECT * FROM users WHERE email = ? AND notHere = 0",
      [email]
    );
    if (user.length == 0)
      return res.status(400).json({
        email: false,
        password: false,
        message: "Adresse email inexistante",
      });

    if (!bcrypt.compareSync(password, user[0].password)) {
      return res.status(400).json({
        email: true,
        password: false,
        message: "Mot de passe incorrect",
      });
    }

    if (user[0].verified == false) {
      console.log("here");
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      await Users.updateOne(
        { codeSended: code, expiredTimestamp: moment().unix() + 900 },
        { id: user[0].id }
      );
      // await twilio.messages.create({
      //   body: `Votre code de confirmation Yuzi est: ${code}`,
      //   to: `${user[0].phoneNumber}`, // Text your number
      //   from: "+12562738311", // From a valid Twilio number
      // });
      console.log(code);
      return res.status(201).json({
        logged: true,
        verified: false,
        codeSended: true,
        user: { ...user[0], password: undefined | null },
      });
    }

    return res.status(200).json({
      logged: true,
      verified: true,
      codeSended: false,
      user: { ...user[0], password: undefined | null },
      token: jwt.sign(
        { ...user[0], password: undefined | null },
        process.env.TOKEN,
        {
          expiresIn: 604800 * 7, // 7 weeks
        }
      ),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.activate = async (req, res) => {
  try {
    const toSet = {
      plan: "trial",
      credits: 15,
      activate: true,
    };

    await Users.updateOne(toSet, { id: req.user.id });
    console.log(req.user);
    const user = Users.findOne({ id: req.user.id });

    return res.status(200).json({
      success: true,
      user: { ...user[0], password: undefined | null },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.getTools = async (req, res) => {
  try {
    return res.status(200).json({ success: true, data: tools });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await Users.findOne({ id: req.params.idUser });
    const last3 = await Revision.customQuery(
      "SELECT * FROM revision WHERE userId = ? ORDER BY created DESC LIMIT 3",
      [req.params.idUser]
    );
    return res.status(200).json({
      success: true,
      user: { ...user[0], passord: undefined | null },
      versionCode: tools.versionCode,
      minAppCode: tools.minAppCode,
      last3: last3,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    let tool = await ToolUsage.findOne({ userId: req.user.id });
    tool.forEach(function (obj) {
      obj.type = "tool";
    });
    let sessions = await Revision.findOne({ userId: req.user.id });
    sessions.forEach(function (obj) {
      obj.type = "session";
    });
    const revisionTool = await RevisionToolUsage.findOne({
      userId: req.user.id,
    });
    revisionTool.forEach(function (obj) {
      obj.type = "revisionTool";
    });
    let finalArray = tool.concat(sessions).concat(revisionTool);
    finalArray.sort(function (a, b) {
      return a.created - b.created;
    });
    const user2send = await Users.findOne({ id: req.user.id });
    return res.status(200).json({
      success: true,
      data: finalArray.reverse(),
      user: { ...user2send[0], password: undefined },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.fakeDelete = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.customQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length == 0)
      return res.status(400).json({
        email: false,
        password: false,
        message: "Numéro de téléphone inexistant",
      });

    if (!bcrypt.compareSync(password, user[0].password)) {
      return res.status(400).json({
        email: true,
        password: false,
        message: "Mot de passe incorrect",
      });
    }

    await Users.updateOne({ notHere: true }, { id: user[0].id });

    return res.status(200).json({ deleted: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.fakeDeleteWToken = async (req, res) => {
  try {
    await Users.updateOne({ notHere: true }, { id: req.user.id });

    return res.status(200).json({ deleted: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};

exports.getFavorite = async (req, res) => {
  try {
    let tool = await ToolUsage.customQuery(
      "SELECT * FROM toolUsage WHERE userId = ? AND favorite = 1",
      req.user.id
    );
    tool.forEach(function (obj) {
      obj.type = "tool";
    });
    let sessions = await Revision.customQuery(
      "SELECT * FROM revision WHERE userId = ? AND favorite = 1",
      req.user.id
    );
    sessions.forEach(function (obj) {
      obj.type = "session";
    });
    const revisionTool = await RevisionToolUsage.customQuery(
      "SELECT * FROM revisionToolUsage WHERE userId = ? AND favorite = 1",
      req.user.id
    );
    revisionTool.forEach(function (obj) {
      obj.type = "revisionTool";
    });
    let finalArray = tool.concat(sessions).concat(revisionTool);
    finalArray.sort(function (a, b) {
      return a.created - b.created;
    });
    const user2send = await Users.findOne({ id: req.user.id });
    return res.status(200).json({
      success: true,
      data: finalArray.reverse(),
      user: { ...user2send[0], password: undefined },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Une erreur inconnu a eu lieu" });
  }
};
