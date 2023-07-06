const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/rewriting", async (req, res, next) => {
  try {
    req.locals = {};
    let { text, style } = req.body;

    let prompt = `Instructions: Réécris le texte A avec le style de réecriture B\n\n`;

    let inputRaw = `A: ${text}\n` + `B: ${style}\n`;

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
          role: "user",
          content: prompt,
        },
      ],
      1,
      1200,
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

    console.log(gptResponse);
    let output = `${gptResponse}`;

    req.locals.tokens = token;

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
    req.locals.name = "Réécriture";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
