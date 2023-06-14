const express = require("express");
const gpt35 = require("../Utils/gpt");
const jsonExtraction = require("../Utils/jsonExtraction");
const tokenizer = require("../Utils/tokenizer");

let app = express.Router()

app.post('/quiz', async (req, res, next) => {
	try {
    req.locals = {}
		let { subject, elements } = req.body

    let prompt = `Génère un quiz sous format JSON, déstiné à un usage scolaire, sur "${subject}" (avec des questions pertinetes et pas si simple, pas non plus si compliqué et originale) en suivant le modèle: 
    {
      "quizTitle": "Le titre du quiz",
      "quizSynopsis": "La description du quiz",
      "nrOfQuestions": "2",
      "questions": [
        {
          "question": "Quand a eu lieu la prise de la Bastille?",
          "questionType": "text",
          "answerSelectionType": "single",
          "answers": [
            "En 1789",
            "En 2002"
          ],
          "correctAnswer": "1",
          "messageForCorrectAnswer": "Super, bonne réponse",
          "messageForIncorrectAnswer": "Mauvaise réponse",
          "explanation": "Explication de la réponse",
          "point": "1"
        },
        {
          "question": "Quelle était la principale cause de l'entrée en guerre des États-Unis pendant la Seconde Guerre mondiale ?",
          "questionType": "text",
          "answerSelectionType": "multipe",
          "answers": [
            "L'attaque surprise de Pearl Harbor par le Japon.",
            "L'alliance militaire avec le Royaume-Uni et l'Union soviétique.",
            "L'expansionnisme agressif de l'Allemagne nazie en Europe.",
            "La sortie du Hip-Hop"
          ],
          "correctAnswer": [
            1,
            2,
            3
          ],
          "messageForCorrectAnswer": "Super, bonne réponse",
          "messageForIncorrectAnswer": "Mauvaise réponse",
          "explanation": "Explication de la réponse",
          "point": "1"
        }
      ]
    }    

    Bien sûr c'est un exemple, prends des questions, plus pertinente, je fais juste ça pou m'assure que t'as compris le principe.
    Génère entre 5 et 10 questions environ, bien précise sur le sujet sans vraiment t'en incarter sans pour autant rester coincé dedans.
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
    req.locals.name = "Quiz";

		next()

	} catch (err) {
		console.log(err)
	}
  })

  module.exports = app