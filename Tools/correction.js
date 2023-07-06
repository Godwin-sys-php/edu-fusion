const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/correction", async (req, res, next) => {
  try {
    req.locals = {};
    let { text } = req.body;

    let prompt = `Tu es un outil qui corrige les fautes de grammaire ou d'orthographe dans les textes donnés par l'utilisateur`;

    let inputRaw = `${text}`;

    prompt += inputRaw;

    console.log(tokenizer(prompt));

    const completionId = uuidv4();
    console.log(completionId);

    req.app
      .get("socketService")
      .broadcastEmiter(
        { userId: req.user.id, completionId: completionId },
        "completionId"
      );

    const [gptResponse, token] = await gpt35(
      [
        {
          role: "system",
          content:
            "Tu es un outil qui corrige les fautes de grammaire ou d'orthographe dans les textes donnés par l'utilisateur",
        },
        {
          role: "user",
          content: `Corrige les fautes présentent dans ce texte si il y en a, si il y en a pas dis "Aucune faute" : ${text}`,
        },
      ],
      1,
      3700,
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

    // remove the first character from output
    //output = output.substring(1, output.length)

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // If the output string ends with one or more hashtags, remove all of them
    if (output.endsWith('"')) {
      output = output.substring(0, output.length - 1);
    }

    // remove a single new line at the end of output if there is one
    if (output.endsWith("\n")) {
      output = output.substring(0, output.length - 1);
    }

    req.locals.input = prompt;
    req.locals.inputRaw = inputRaw;
    req.locals.output = output;
    req.locals.name = "Correction de texte";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
