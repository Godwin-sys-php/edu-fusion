const tools = {
  versionCode: 1,
  data: [
    {
      title: "Plume Libre",
      desc: "Libérez votre créativité avec Plume Libre. Dirigez l'IA pour rédiger, questionner ou explorer des idées, sans aucune contrainte.",
      icon: {
        type: "FontAwesome5",
        name: "feather",
        size: 28,
        color: "white",
      },

      colorCombo: 5,

      to: "/tools/freestyle",
      api: "/tools/freestyle",

      output: {
        title: "Réponse",
        desc: "Voici la réponse généré par l'IA",
      },
      prompts: [
        {
          title: "Texte à soumettre à l'IA",
          attr: "qa",
          placeholder:
            "Raconte moi sous forme d'histoire la seconde guerre mondaile...",
          type: "textarea",
          minLength: 1,
          maxLength: 800,
          required: true,
          example:
            "Donne moi le plan pour mon exposé de géographie sur la place de l'ONU dans la société actuelle",
        },
      ],
      example: {
        output: `Dans l'ère technologique où nous évoluons,
  Se développe une intelligence artificielle passionnante,
  Elle apprend, elle imite, elle raisonne,
  Fascinante, elle devient captivante.
  
  Elle sait anticiper, calculer,l
  Elle exécute des milliers de tâches à la seconde,
  Une machine qui peut presque penser,
  Quelle prodigieuse invention qui abonde.
  
  Certains la voient comme un danger,
  L'homme pourrait-il être surpassé ?
  Mais elle est là pour nous aider,
  Ainsi notre confort est maximisé.
  
  Elle analyse, elle suggère,
  En quelques secondes, elle agrège,
  L'intelligence artificielle est un maître,
  Elle envahit nos vies sans aucun refus ni allégence.
  
  Que sera l'avenir pour notre destinée,
  Avec cette incroyable intelligence artificielle,
  Sera-t-on en mesure de la dominer,
  Ou succombera-t-elle à nos propres querelles ?
  
  L'intelligence artificielle est un véritable prodige,
  Elle augure le paysage futur,
  Mais n'oublions pas qu'elle n'est qu'une sorte de clé,
  L'homme, sans cesse, reste le gardien de sa propre ouverture.
        `,
      },
    },
    {
      title: "Introduction",
      desc: "Créez une introduction, une phrase d'ouverture ou un paragraphe utile pour votre article ou votre rédaction.",
      icon: {
        type: "Feather",
        name: "info",
        size: 28,
        color: "white",
      },

      colorCombo: 1,

      to: "/tools/intro",
      api: "/tools/intro",

      output: {
        title: "Introduction",
        desc: "Voici l'introduction générée par l'IA",
      },
      prompts: [
        {
          title: "Problématique",
          attr: "problematique",
          placeholder: "La problématique ou le sujet de votre introduction",
          type: "input",
          minLength: 1,
          maxLength: 150,
          required: true,
          example:
            "Les enseignants de collège n'ont pas les compétences nécessaires pour reconnaître et guider les élèves surdoués en cours",
        },
      ],
      example: {
        output:
          "Les élèves surdoués ont des capacités intellectuelles supérieures à la moyenne de leur âge, ce qui peut souvent les amener à s'ennuyer en classe ou à avoir des difficultés à trouver leur place. Bien que certains enseignants soient formés pour reconnaître et soutenir ces élèves, il est souvent difficile pour les enseignants de collège, qui ont une charge de travail importante, de fournir une aide adaptée aux élèves surdoués. Dans cette rédaction, nous allons examiner les compétences nécessaires pour reconnaître et guider les élèves surdoués en classe, les difficultés rencontrées par les enseignants de collège et les solutions potentielles pour améliorer l'encadrement de ces élèves.",
      },
    },
    {
      title: "Developpement",
      desc: "Créez un paragraphe utile pour votre article ou votre rédaction.",
      icon: {
        type: "Feather",
        name: "maximize",
        size: 28,
        color: "white",
      },

      colorCombo: 1,

      to: "/tools/development",
      api: "/tools/development",

      output: {
        title: "Développement",
        desc: "Voici le paragraphe généré par l'IA",
      },

      prompts: [
        {
          title: "Sujet principale",
          attr: "main",
          placeholder: "La Seconde Guerre Mondiale",
          type: "input",
          minLength: 1,
          maxLength: 50,
          required: true,
          example: "La Seconde Guerre Mondiale",
        },
        {
          title: "Sujet à traité",
          attr: "sub",
          placeholder: "L'armistice",
          type: "input",
          minLength: 1,
          maxLength: 50,
          required: true,
          example: "L'armistice",
        },
        {
          title: "Points à aborder",
          attr: "points",
          placeholder:
            "Les points que vous souhaitez aborder dans votre développement",
          type: "textarea",
          maxLength: 200,
          required: false,
          example: "",
        },
      ],
      example: {
        output:
          "L'armistice marqua la fin de la guerre et détermina les conditions de la victoire des Alliés. Signé le 8 mai 1945, après la reddition officielle de l'Allemagne, il mit fin à six années de guerre sanglante en Europe. L'armistice a marqué un tournant dans l'histoire, car il a ouvert la voie à une ère de reconstruction et de réconciliation entre les pays d'Europe. De plus, il a permis l'organisation de procès des criminels de guerre nazis et la création de l'Organisation des Nations Unies. Cependant, l'armistice n'a pas mis fin à tous les conflits. La guerre continue en Asie, où les combats avec le Japon ont duré jusqu'à l'automne 1945. Les conséquences de la guerre ont été dévastatrices pour les populations civiles et les soldats, marquées par la mort, la destruction et la souffrance. Ainsi, la Seconde Guerre mondiale constitue un événement majeur de l'histoire contemporaine dont les répercussions ont été ressenties longtemps après la fin du conflit.",
      },
    },
    {
      title: "Conclusion",
      desc: "Créez une conclusion, une phrase de fermure ou un paragraphe utile pour votre article ou votre rédaction.",
      icon: {
        type: "EvilIcons",
        name: "check",
        size: 28,
        color: "white",
      },

      colorCombo: 1,

      to: "/tools/conclusion",
      api: "/tools/conclusion",

      output: {
        title: "Conclusion",
        desc: "Voici la conclusion générée par l'IA",
      },
      prompts: [
        {
          title: "Problématique",
          attr: "problematique",
          placeholder: "La problématique ou le sujet de votre conclusion",
          type: "input",
          minLength: 1,
          maxLength: 150,
          required: true,
          example:
            "Les enseignants de collège n'ont pas les compétences nécessaires pour reconnaître et guider les élèves surdoués en cours",
        },
      ],
      example: {
        output:
          "Les élèves surdoués ont des capacités intellectuelles supérieures à la moyenne de leur âge, ce qui peut souvent les amener à s'ennuyer en classe ou à avoir des difficultés à trouver leur place. Bien que certains enseignants soient formés pour reconnaître et soutenir ces élèves, il est souvent difficile pour les enseignants de collège, qui ont une charge de travail importante, de fournir une aide adaptée aux élèves surdoués. Dans cette rédaction, nous allons examiner les compétences nécessaires pour reconnaître et guider les élèves surdoués en classe, les difficultés rencontrées par les enseignants de collège et les solutions potentielles pour améliorer l'encadrement de ces élèves.",
      },
    },
    {
      title: "Dissertation TAS",
      desc: "Créez une dissertation suvivant le modèle Thèse-Antithèse-Synthèse",
      icon: {
        type: "FontAwesome",
        name: "pencil",
        size: 28,
        color: "white",
      },

      colorCombo: 2,

      to: "/tools/dissertation",
      api: "/tools/dissertation",

      output: {
        title: "Dissertation",
        desc: "Voici la dissertation générée par l'IA",
      },
      prompts: [
        {
          title: "Le sujet ou la problématique de votre dissertation",
          attr: "subject",
          placeholder:
            "La place de la science durant la Seconde Guerre mondiale ",
          type: "input",
          minLength: 1,
          maxLength: 100,
          required: true,
          example: "La sagesse est l'art de vivre",
        },
        {
          title: "Les éléments à inclure",
          attr: "elements",
          placeholder:
            "Les éléments que vous souhaitez voir dans votre dissertation",
          type: "textarea",
          maxLength: 200,
          required: false,
          example: "",
        },
      ],
      example: {
        output: `Introduction:
  La sagesse est une qualité reconnue à travers le temps et l'espace, souvent considérée comme le summum de l'art de vivre. Elle ne se limite pas à la simple accumulation de connaissances ou à la réalisation d'objectifs concrets, mais implique une réflexion approfondie sur la vie et ses valeurs, ainsi qu'une série de choix conscients. Mais quels sont les composants de la sagesse et comment pouvons-nous les cultiver?
  
  Thèse:
  La sagesse est un art de vivre qui repose sur plusieurs piliers. Tout d'abord, la sagesse nécessite la connaissance de soi. Lorsque nous nous connaissions mieux, nous apprenons à être honnêtes avec nous-mêmes et à reconnaître nos propres limites. Cela nous aide à prendre des décisions plus éclairées et à orienter nos choix en fonction de nos besoins et de nos valeurs.
  
  De même, la sagesse implique une forte éthique personnelle. Les personnes sages cherchent à vivre une vie en accord avec leurs croyances et leurs valeurs profondes, en agissant avec honnêteté et intégrité. Ils sont également respectueux des autres et cherchent à établir des relations harmonieuses avec leur entourage.
  
  En outre, la sagesse suppose une attitude d'ouverture et une curiosité constante. Une personne sage est habitée d'un désir de comprendre le monde qui l'entoure, de découvrir de nouvelles idées et d'élargir ses horizons. Ils se montrent également réceptifs aux idées des autres et sont prêts à remettre en cause leurs propres convictions.
  
  Antithèse:
  Cependant, il est possible aussi de voir la sagesse d’un autre angle, car elle n'est pas un idéal immuable, mais plutôt une qualité qui varie selon les différentes cultures et les époques de l'histoire. En effet, les critères pour juger de la sagesse humaine varient d'une société à l'autre : ce qui est considéré comme sage dans certaines cultures peut être perçu comme étrange ou même nocif dans d'autres. Par conséquent, il semble difficile d'établir une définition universelle de la sagesse.
  
  En outre, il existe des cas où la sagesse peut entrer en conflit avec d'autres valeurs également importantes. Par exemple, l'honnêteté est souvent considérée comme une qualité sage, mais dans certaines situations, la dissimulation d'informations peut s'avérer nécessaire pour protéger une personne ou une communauté. Dans ces cas, la sagesse peut exiger de prendre des décisions difficiles, voire contradictoires, qui peuvent être difficiles à justifier.
  
  Synthèse:
  Finalement, il apparaît que la sagesse est une qualité complexe qui dépend de nombreux facteurs, tels que la connaissance de soi, l'éthique personnelle et l'attitude d'ouverture. Cependant, comme le soutient l'antithèse, la sagesse est également fortement influencée par les cultures et les valeurs de la société dans laquelle elle émerge. Par conséquent, il n'est pas possible d'établir une définition universelle de la sagesse.
  
  Une autre conclusion importante est que la sagesse n'est pas une qualité statique mais plutôt une qualité dynamique, capable de s'adapter aux circonstances et aux valeurs changeantes. Bien qu'il puisse y avoir des conflits entre la sagesse et d'autres valeurs, les personnes les plus sages sont celles qui sont capables de naviguer avec succès dans ces contextes complexes, en décidant des choix les mieux adaptés à la situation spécifique.
  
  Conclusion:
  En fin de compte, la sagesse est un art de vivre qui définit les individus les plus accomplis et les plus épanouis, mais qui dépend également de multiples facteurs. Pour cultiver la sagesse, il est important de rechercher une plus grande connaissance de soi, de vivre en accord avec ses valeurs et de rester curieux et ouvert d'esprit. La sagesse n’est pas un idéal immuable, mais plutôt une qualité dynamique qui s’adapte à différents contextes de vie, en permettant aux individus de naviguer avec succès dans un monde complexe et changeant.
        `,
      },
    },
    {
      title: "Fiche de révision",
      desc: "Créez une fiche de révision sur le sujet souhaité",
      icon: {
        type: "FontAwesome5",
        name: "graduation-cap",
        size: 28,
        color: "white",
      },

      colorCombo: 2,

      to: "/tools/revision",
      api: "/tools/revision",

      output: {
        title: "Fiche de révision",
        desc: "Voici la fiche de révision générée par l'IA",
      },
      prompts: [
        {
          title: "Le sujet de votre fiche de révision",
          attr: "subject",
          placeholder: "La première guerre mondiale",
          type: "input",
          minLength: 3,
          maxLength: 100,
          required: true,
          example: "Le système immunitaire",
        },
      ],
      example: {
        output: `Introduction:
  Le système immunitaire est un ensemble de mécanismes physiologiques qui permettent à l'organisme de se défendre contre les agents pathogènes tels que les bactéries, les virus, les parasites et certains types de cellules cancéreuses. Le système immunitaire est divisé en deux types : l'immunité innée et l'immunité acquise.
  
  I. L'immunité innée 
  L'immunité innée est la première ligne de défense naturelle contre les agents pathogènes. Elle est constituée de différents types de cellules qui vont détecter et tuer les agents infectieux. Les leucocytes, globules blancs présents dans le sang, sont les principaux acteurs de cette réponse immunitaire innée.
  
  II. L'immunité acquise 
  L'immunité acquise est activée lorsque l'immunité innée n'a pas réussi à détruire l'agent pathogène. Cette immunité adaptative est spécifique à l'agent pathogène et peut-être divisée en deux catégories, l'immunité humorale et l'immunité cellulaire :
  
  a. L'immunité humorale est médiée par des anticorps produits par les cellules B. Les anticorps vont se lier spécifiquement aux antigènes des agents pathogènes et les neutraliser.
  
  b. L'immunité cellulaire est médiée par les lymphocytes T. Les lymphocytes T vont reconnaître et détruire les cellules infectées par les agents pathogènes ainsi que les agents pathogènes eux-mêmes.
  
  III. La mémoire immunitaire 
  Après la résolution de l'infection, une population de cellules mémoire est laissée dans l'organisme. Ces cellules mémoire permettent une réponse plus rapide et plus efficace si l'organisme est de nouveau exposé au même agent pathogène.
  
  Conclusion:
  Le système immunitaire est essentiel pour maintenir la santé de l'organisme. L'immunité innée est la première ligne de défense rapide contre les agents pathogènes tandis que l'immunité acquise est plus spécifique et crée une mémoire immunitaire pour une réponse plus rapide et plus efficace si l'organisme est de nouveau exposé à l'agent pathogène.
        `,
      },
    },
    {
      title: "Correction de texte",
      desc: "Vérifier si votre texte ne comprends aucune faute et les corriges",
      icon: {
        type: "FontAwesome5",
        name: "check-square",
        size: 28,
        color: "white",
      },

      colorCombo: 2,

      to: "/tools/correction",
      api: "/tools/correction",

      output: {
        title: "Texte",
        desc: "Voici le texte corrigé généré par l'IA",
      },

      prompts: [
        {
          title: "Texte",
          attr: "text",
          placeholder: "Le texte que vous souhaitez faire vérifier",
          type: "textarea",
          minLength: 1,
          maxLength: 600,
          required: true,
          example:
            "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son bute est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
        },
      ],

      example: {
        output:
          "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
      },
    },
    {
      title: "Réécriture",
      desc: "Réécrivez des textes de manière plus original",
      icon: {
        type: "Feather",
        name: "rotate-ccw",
        size: 28,
        color: "white",
      },

      colorCombo: 3,

      to: "/tools/rewriting",
      api: "/tools/rewriting",

      output: {
        title: "Réécriture",
        desc: "Voici la texte généré par l'IA",
      },

      prompts: [
        {
          title: "Texte à réécrire",
          attr: "text",
          placeholder: "Le texte que vous souhaitez réécrire...",
          type: "textarea",
          minLength: 1,
          maxLength: 600,
          required: true,
          example:
            "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
        },
        {
          title: "Style de réecriture",
          attr: "style",
          placeholder:
            "Moins complexe, changement de mot, changement de temps, etc.",
          type: "input",
          maxLength: 100,
          required: false,
          example: "Plus simple",
        },
      ],
      example: {
        output:
          "L'IA imite l'intelligence humaine en utilisant des algorithmes dans un environnement informatique, afin que les ordinateurs puissent penser et agir comme des humains.",
        // outputs: []
        // color: "",
      },
    },
    {
      title: "Résumeur",
      desc: "Analysez votre texte ou vos documents et transmettez les concepts importants sous forme de texte.",
      icon: {
        type: "FontAwesome5",
        name: "compress",
        size: 28,
        color: "white",
      },

      colorCombo: 3,

      to: "/tools/summarize",
      api: "/tools/summarize",

      output: {
        title: "Résumeur",
        desc: "Voici le résumé écrit par l'IA",
      },
      prompts: [
        {
          title: "Contenu",
          attr: "content",
          value: "",
          placeholder: "La phrase ou le paragraphe que vous souhaitez résumer",
          type: "textarea",
          minLength: 1,
          maxLength: 600,
          required: true,
          example:
            "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
        },
      ],
      example: {
        output:
          "L'intelligence artificielle est un processus qui permet aux ordinateurs de penser et d'agir comme des êtres humains en imitant leur intelligence grâce à des algorithmes exécutés dans un environnement informatique dynamique.",
      },
    },
    {
      title: "Poème",
      desc: "Créez des poèmes en un rien de temps avec l'IA",
      icon: {
        type: "Feather",
        name: "feather",
        size: 28,
        color: "white",
      },

      colorCombo: 3,

      to: "/tools/poem",
      api: "/tools/poem",

      output: {
        title: "Poème",
        desc: "Voici le poème généré par l'IA",
      },
      prompts: [
        {
          title: "Description",
          attr: "desc",
          placeholder: "Un poème sur l'amour...",
          type: "textarea",
          minLength: 1,
          maxLength: 150,
          required: true,
          example: "Un poème sur l'intelligence artificielle",
        },
      ],
      example: {
        output: `Dans l'ère technologique où nous évoluons,
  Se développe une intelligence artificielle passionnante,
  Elle apprend, elle imite, elle raisonne,
  Fascinante, elle devient captivante.
  
  Elle sait anticiper, calculer,l
  Elle exécute des milliers de tâches à la seconde,
  Une machine qui peut presque penser,
  Quelle prodigieuse invention qui abonde.
  
  Certains la voient comme un danger,
  L'homme pourrait-il être surpassé ?
  Mais elle est là pour nous aider,
  Ainsi notre confort est maximisé.
  
  Elle analyse, elle suggère,
  En quelques secondes, elle agrège,
  L'intelligence artificielle est un maître,
  Elle envahit nos vies sans aucun refus ni allégence.
  
  Que sera l'avenir pour notre destinée,
  Avec cette incroyable intelligence artificielle,
  Sera-t-on en mesure de la dominer,
  Ou succombera-t-elle à nos propres querelles ?
  
  L'intelligence artificielle est un véritable prodige,
  Elle augure le paysage futur,
  Mais n'oublions pas qu'elle n'est qu'une sorte de clé,
  L'homme, sans cesse, reste le gardien de sa propre ouverture.
        `,
      },
    },
    {
      title: "Générateur de contenu",
      desc: "Créez du contenu sur le sujet de votre choix",
      icon: {
        type: "Octicons",
        name: "light-bulb",
        size: 28,
        color: "white",
      },

      colorCombo: 4,

      to: "/tools/content-generator",
      api: "/tools/content-generator",

      output: {
        title: "Contenu",
        desc: "Voici le contenu généré par l'IA",
      },

      prompts: [
        {
          title: "Le sujet ou la problématique de votre contenu",
          attr: "subject",
          placeholder:
            "La place de la science durant la Seconde Guerre mondiale",
          type: "input",
          minLength: 1,
          maxLength: 100,
          required: true,
          example: "L'intelligence artificielle",
        },
        {
          title: "Les éléments à inclure",
          attr: "elements",
          placeholder:
            "Les éléments que vous souhaitez voir dans votre contenu",
          type: "textarea",
          maxLength: 200,
          required: false,
          example: "",
        },
      ],
      example: {
        output: `L'intelligence artificielle (IA) est un domaine de l'informatique qui vise à créer des machines capables de réfléchir, d'apprendre, de résoudre des problèmes et de prendre des décisions de manière autonome, comme le ferait un être humain. Elle est généralement considérée comme l'une des technologies les plus transformantes et les plus prometteuses du siècle.
  
  Grâce aux progrès de la puissance de calcul informatique, de la connectivité internet, du big data et de la capacité d'apprentissage profond des réseaux de neurones, l'IA est devenue un domaine dynamique et en constante évolution, permettant des avancées rapides dans de nombreux secteurs tels que la santé, l'industrie, la finance, les transports, l'énergie, la sécurité, les jeux vidéo et bien d'autres.
  
  L'IA se décline en plusieurs formes, notamment les systèmes de reconnaissance d'image, les assistants virtuels, les chatbots, les systèmes de recommandation, les algorithmes de trading, les robots autonomes, les véhicules autonomes et les drones. Tous ces dispositifs sont conçus pour effectuer des tâches avec une grande précision, efficacité et polyvalence.
  
  Cependant, l'IA pose également des questions cruciales pour la société, notamment la protection des données personnelles, le respect de la vie privée, l'éthique, la sécurité, la responsabilité civile, la réglementation et l'impact sur l'emploi. Les effets de l'IA sur les emplois traditionnels sont notamment associés à la destruction de certains emplois manuels.
  
  Par conséquent, une réglementation appropriée et une stratégie publique plus large sont essentielles pour encadrer le développement de l'IA, afin de maximiser ses avantages pour l'humanité tout en minimisant les coûts et les risques.  En conclusion, l'IA est une technologie extrêmement prometteuse qui a le potentiel de transformer radicalement notre vie sociale, économique et culturelle à l'échelle mondiale. Il est essentiel de réfléchir à ce que cette technologie représente pour l'avenir et de travailler ensemble pour assurer une utilisation responsable, éthique et efficace.
        `,
      },
    },
    {
      title: "Synonymes",
      desc: "Obtenez des synonymes pour le mot désiré.",
      icon: {
        type: "FontAwesome",
        name: "quote-right",
        size: 28,
        color: "white",
      },

      colorCombo: 4,

      to: "/tools/synonym",
      api: "/tools/synonym",

      output: {
        title: "Synonymes",
        desc: "Voici les synonymes trouvés par l'IA",
      },

      prompts: [
        {
          title: "Mot",
          attr: "word",
          value: "",
          placeholder: "Le mot",
          type: "input",
          minLength: 1,
          maxLength: 50,
          required: true,
          example:
            "L'intelligence artificielle (IA) est un processus d'imitation de l'intelligence humaine qui repose sur la création et l'application d'algorithmes exécutés dans un environnement informatique dynamique. Son but est de permettre à des ordinateurs de penser et d'agir comme des êtres humains.",
        },
      ],
      example: {
        output: `"L'intelligence artificielle : la capacité d'imiter l'intelligence humaine"`,
      },
    },
    {
      title: "Traduction",
      desc: "Traduisez le texte de votre choix dans la langue souhaité",
      icon: {
        type: "FontAwesome5",
        name: "language",
        size: 28,
        color: "white",
      },

      colorCombo: 4,

      to: "/tools/traduction",
      api: "/tools/traduction",

      output: {
        title: "Traduction",
        desc: "Voici la traduction trouvé par l'IA",
      },

      prompts: [
        {
          title: "La langue cible",
          attr: "langage",
          placeholder: "Français, Anglais, Espagnol, Mandarin, etc.",
          type: "input",
          minLength: 1,
          maxLength: 150,
          required: true,
          example: "Anglais",
        },
        {
          title: "Texte",
          attr: "text",
          placeholder: "Le texte à traduire",
          type: "textarea",
          minLength: 1,
          maxLength: 1000,
          required: true,
          example: `Les habitants de Paris sont d'une curiosité qui va jusqu'à l'extravagance. Lorsque j'arrivai, je fus regardé comme si j'avais été envoyé du ciel : vieillards, hommes, femmes, enfants, tous voulaient me voir.`,
        },
      ],
      example: {
        output: `The inhabitants of Paris are so curious that it borders on extravagance. When I arrived, I was looked upon as if I had come from heaven: old men, men, women, children, all wanted to see me.`,
        // color: "blue",
      },
    },
  ],
};

module.exports = tools;
