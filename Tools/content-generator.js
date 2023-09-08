const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/content-generator", async (req, res, next) => {
  try {
    req.locals = {};
    let { subject, elements } = req.body;

    let prompt = `Ecris du contenu sur ce sujet: ${subject}.\n\n`;

    if (elements) {
      prompt += `Tout en incluant ces éléments: ${elements}\n\n`;
    }

    let inputRaw = `Sujet: ${subject} Eléments: ${elements}\n`;

    console.log(tokenizer(prompt));
    const completionId = uuidv4();
    req.app
      .get("socketService")
      .broadcastEmiter(
        { userId: req.user.id, completionId: completionId },
        "completionId"
      );

    const [gptResponse, token] = await gpt35(
      [
        {
          role: "user",
          content: prompt,
        },
      ],
      1,
      3000,
      (data) => {
        let formattedData = !req.body.isFromMobile ? data.replace(/\n/g, "<br />") : data;
        req.app.get("socketService").broadcastEmiter(
          {
            userId: req.user.id,
            data: formattedData,
            completionId: completionId,
          },
          "completion"
        );
      }
    );

    let output = `${gptResponse}`;

    req.locals.tokens = token;

    req.locals.outputRaw = output;
    req.locals.outputRaw = output;

    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    if (output.endsWith("\n")) {
      output = output.substring(0, output.length - 1);
    }

    req.locals.input = prompt;
    req.locals.inputRaw = inputRaw;
    req.locals.output = output;
    req.locals.name = "Générateur de contenu";

    next();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ error: true, message: "Une erreur inconnu au eu lieu, veuillez réessayez ou contactez nous !" });
  }
});

module.exports = app;
