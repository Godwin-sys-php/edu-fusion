const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/revision", async (req, res, next) => {
  try {
    req.locals = {};
    let { subject } = req.body;

    let prompt = `Tu es une intelligence artificielle qui génère des fiche de révision destiné à un usage scolaire ou universitaire, en prenant en paramètre le sujet sur lequel faire la fiche de révision et le résumé tout en donnant un maximum de détail`;

    let inputRaw = `Sujet: ${subject}`;

    const prompt2 = prompt + inputRaw;

    console.log(tokenizer(prompt2));

    // const gptResponse = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `${prompt}`,
    //   max_tokens: 900 - tokenizer(prompt),
    //   temperature: 1,
    //   stop: ["Sujet:", "Fiche de révision:", `"""`]
    // });
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
          content: prompt,
        },
        {
          role: "user",
          content: inputRaw,
        },
      ],
      1,
      3700,
      (data) => {
        let formattedData = data.replace(/\n/g, "<br />");
        req.app
          .get("socketService")
          .broadcastEmiter(
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
    console.log(output);

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

    req.locals.input = prompt2;
    req.locals.inputRaw = inputRaw;
    req.locals.output = output;
    req.locals.name = "Fiche de révision";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
