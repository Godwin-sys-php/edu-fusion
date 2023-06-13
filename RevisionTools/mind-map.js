const express = require("express");
const gpt35 = require("../Utils/gpt");
const jsonExtraction = require("../Utils/jsonExtraction");
const tokenizer = require("../Utils/tokenizer");

let app = express.Router()

app.post('/mind-map', async (req, res, next) => {
	try {
    req.locals = {}
		let { subject, elements } = req.body

    let prompt = `Génère une carte mentale précise, concise, globale,  déstiné à un usage scolaire, sous format JSON pouvant contenir de nombreux (voir une infinité)  de thème et sous thèmes encapsulé sur "${subject}" en suivant le modèle: 
    {
        "title": "Sujet principal",
        "description": "Une description détaillée du sujet principal.",
        "subtopics": [
            {
                "title": "Sous-thème 1",
                "description": "Une description détaillée du sous-thème 1.",
                "subtopics": [{
                "title": "Sous-thème 1",
                "description": "Une description détaillée du sous-thème 1.",
                "subtopics": []
            },{
                "title": "Sous-thème 2",
                "description": "Une description détaillée du sous-thème 2.",
                "subtopics": []
            }]
            },
            {
                "title": "Sous-thème 2",
                "description": "Une description détaillée du sous-thème 2.",
                "subtopics": []
            }
        ]
    }
    
    Il faudrait que ta carte mentale ait le plus de détail possible sans non plus être trop longue (ainsi n'hésite pas à créer autant de sous points que tu le souhaites).`;

    if (elements) {
      prompt += `\n\nEt il faudrait en plus du thème principales que les mots / élements suivants s'y retrouve: ${elements}`
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
    req.locals.name = "Carte mentale";

		next()

	} catch (err) {
		console.log(err)
	}
  })

  module.exports = app