const express = require("express");
const gpt35 = require("../Utils/gpt");
const jsonExtraction = require("../Utils/jsonExtraction");
const tokenizer = require("../Utils/tokenizer");

let app = express.Router()

app.post('/flashcards', async (req, res, next) => {
	try {
    req.locals = {}
		let { subject, elements } = req.body

    let prompt = `Génère des flashcards (question, réponse, explication à la réponse) sous format JSON, déstiné à un usage scolaire, sur "${subject}" en suivant le modèle: 
    {
      data: [
        {
          "question": "Question 1",
          "answer": "Réponse 1",
          "explanation": "Une explication courte de la réponse 1"
        },
        {
          "question": "Question 2",
          "answer": "Réponse 2",
          "explanation": "Une explication courte de la réponse 2"
        },
        {
          "question": "Question 3",
          "answer": "Réponse 3",
          "explanation": "Une explication courte de la réponse 3"
        },
        ...
      ]
    }

    Génère entre 12 et 20 questions environ, bien précise sur le sujet sans vraiment t'en incarter sans pour autant rester coincé dedans
    `;

    if (elements) {
      prompt += `\n\nEt il faudrait en plus du thème principales que les éléments / questions suivantes s'y retrouve: ${elements}`
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
    req.locals.name = "Flashcards";

		next()

	} catch (err) {
		console.log(err)
	}
  })

  module.exports = app