const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/poem", async (req, res, next) => {
  try {
    req.locals = {};
    let { desc } = req.body;

    let prompt = `Génère une poème qui rime beaucoup en te basant sur ces données:\n\n`;

    let inputRaw = `${desc}\n`;

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
      1900,
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
    req.locals.name = "Poème";

    next();
  } catch (err) {
    console.log(err)
return res.status(200).json({ error: true, message: "Une erreur inconnu au eu lieu, veuillez réessayez ou contactez nous !" });;
  }
});

module.exports = app;
