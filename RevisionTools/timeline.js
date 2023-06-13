const express = require("express");
const gpt35 = require("../Utils/gpt");
const jsonExtraction = require("../Utils/jsonExtraction");
const tokenizer = require("../Utils/tokenizer");

let app = express.Router()

app.post('/timeline', async (req, res, next) => {
	try {
    req.locals = {}
		let { subject, elements } = req.body

    let prompt = `Génère une frise chronologique avec le plus de date possible sans aller trop loin, sous format JSON, déstiné à un usage scolaire, sur "${subject}" en suivant le modèle: 
    {
      data: [
        {
          "date": "la date de l'évènement",
          "event": "le nom de l'évènement",
          "description": "une brève explication de l'évènement"
        }
      ]
    }`;

    if (elements) {
      prompt += `\n\nEt il faudrait en plus du thème principales que les évènements suivants s'y retrouve: ${elements}`
    }

		let inputRaw = `Sujet: ${subject}`;


    console.log(tokenizer(prompt));

    const [gptResponse, token] = await gpt35([
      {
        role: "user",
        content: prompt,
      },
    ], 1, 3700);
    

    console.log(gptResponse);
    let output = `${gptResponse}`;
    output = jsonExtraction(output);

    req.locals.tokens = token;

		req.locals.outputRaw = output
	
		req.locals.input = prompt
		req.locals.inputRaw = inputRaw
		req.locals.output = output
    req.locals.name = "Frise Chronologique";

		next()

	} catch (err) {
		console.log(err)
	}
  })

  module.exports = app