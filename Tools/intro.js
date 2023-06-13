const express = require("express");
const gpt35 = require("../Utils/gpt");
const tokenizer = require("../Utils/tokenizer");
const { v4: uuidv4 } = require("uuid");

let app = express.Router();

app.post("/intro", async (req, res, next) => {
  try {
    req.locals = {}
    console.log(req.body);
    let { problematique } = req.body;

    let prompt = `L'outil suivant crée un paragraphe d'introduction sur la base des métadonnées fournies:\n"""\n Problématique: Comment la fin de la Seconde Guerre mondiale a-t-elle influencé le panorama du monde à venir ?\nIntroduction: La Seconde Guerre mondiale a pris fin le 2 septembre 1945 avec un très lourd bilan à bien des aspects : matériel, humain et moral. Comment la fin de la Seconde Guerre mondiale a-t-elle influencé le panorama du monde à venir ? Pour répondre à la problématique, nous commencerons par voir le bilan de cette guerre et nous terminerons par le nouvel ordre mondial qui sera installé après la guerre.\n"""\n

    Problématique: Comment la Seconde Guerre mondiale a-t-elle été vécue, par les soldats mais aussi par les civils ?\nIntroduction: La Seconde Guerre mondiale a été un conflit d'une ampleur sans précédent qui a impliqué la plupart des nations du monde. Au-delà des chiffres et des dates, cette guerre a eu un impact profond sur la vie des gens à travers le monde, qu'ils soient soldats sur le front ou civils dans leur quotidien. Les soldats ont connu des conditions de combat brutales, tandis que les civils ont dû faire face aux conséquences de la guerre, comme les bombardements, les restrictions alimentaires et les déplacements forcés. Dans cette introduction, nous allons explorer comment la Seconde Guerre mondiale a été vécue par les soldats et les civils, en examinant les différentes expériences et les émotions qu'ils ont traversées.\n"""\n`;

    let inputRaw = `Problématique: ${problematique}\n` + `Introduction:`;

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

    const [gptResponse, token] = await gpt35([
      {
        role: "system",
        content:
          "Tu es un outil qui génère des introduction qui seront utilisées dans un cadre scolaire ou professionnel sur base des métadonnée fournie.",
      },
      {
        role: "user",
        content:
          "Problématique: Comment la fin de la Seconde Guerre mondiale a-t-elle influencé le panorama du monde à venir ?",
      },
      {
        role: "assistant",
        content:
          "La Seconde Guerre mondiale a pris fin le 2 septembre 1945 avec un très lourd bilan à bien des aspects : matériel, humain et moral. Comment la fin de la Seconde Guerre mondiale a-t-elle influencé le panorama du monde à venir ? Pour répondre à la problématique, nous commencerons par voir le bilan de cette guerre et nous terminerons par le nouvel ordre mondial qui sera installé après la guerre.",
      },
      {
        role: "user",
        content:
          "Problématique: Comment la Seconde Guerre mondiale a-t-elle été vécue, par les soldats mais aussi par les civils ?",
      },
      {
        role: "assistant",
        content:
          "La Seconde Guerre mondiale a été un conflit d'une ampleur sans précédent qui a impliqué la plupart des nations du monde. Au-delà des chiffres et des dates, cette guerre a eu un impact profond sur la vie des gens à travers le monde, qu'ils soient soldats sur le front ou civils dans leur quotidien. Les soldats ont connu des conditions de combat brutales, tandis que les civils ont dû faire face aux conséquences de la guerre, comme les bombardements, les restrictions alimentaires et les déplacements forcés. Dans cette introduction, nous allons explorer comment la Seconde Guerre mondiale a été vécue par les soldats et les civils, en examinant les différentes expériences et les émotions qu'ils ont traversées.",
      },
      {
        role: "user",
        content:
          `Problématique: ${problematique}`,
      },
    ], 1, 2000, (data) => {
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
    });

    console.log(gptResponse);
    let output = `${gptResponse}`;

    req.locals.tokens = token;

    req.locals.outputRaw = output;

    // remove the first character from output
    //output = output.substring(1, output.length);

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
    req.locals.name = "Introduction";

    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;