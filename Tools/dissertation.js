const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/dissertation", async (req, res, next) => {
  try {
    req.locals = {};
    let { subject, elements } = req.body;

    let prompt = `Génére une dissertation longue et développée sous le modèle Introduction-Thèse-Antithèse-Synthèse-Conclusion sur le sujet ${subject}`;

    if (elements) {
      prompt += ` et il faudrait que les mots / élements suivants s'y retrouve: ${elements}`;
    }

    let inputRaw = `Sujet: ${subject}`;

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
          role: "user",
          content: prompt,
        },
      ],
      1,
      3700,
      (data) => {
        let formattedData = data.replace(/\n/g, "<br />");
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

    console.log(gptResponse);
    let output = `${gptResponse}`;

    req.locals.tokens = token;

    req.locals.outputRaw = output;

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
    req.locals.name = "Dissertation TAS";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
