const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/traduction", async (req, res, next) => {
  try {
    req.locals = {};
    let { text, langage } = req.body;

    let prompt = `Traduis ce texte en ${langage}: ${text}\n\n`;

    let inputRaw = `Langue: ${langage} Texte: ${text}\n`;

    //prompt += inputRaw

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
    req.locals.name = "Traduction";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
