const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/freestyle", async (req, res, next) => {
  try {
    req.locals = {};
    let { qa } = req.body;

    let prompt = `${qa}`;

    let inputRaw = `${qa}\n`;

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
      1900,
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
    req.locals.name = "Plume Libre";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
