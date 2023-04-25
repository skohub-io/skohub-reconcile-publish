export const hcrt_jsonld = {
  account: "test",
  dataset: "https://w3id.org/kim/hcrt/scheme",
  entries: [
    {
      id: "https://w3id.org/kim/hcrt/scheme",
      type: "ConceptScheme",
      description: {
        de: "Eine Wertelliste für Typen von Lernressourcen (Learning Resource Type), entstanden im Kontext des Metadatenschemas \"LOM for Higher Education OER Repositories\" (https://w3id.org/dini-ag-kim/hs-oer-lom-profil/latest/).",
      },
      "dct:issued": "2020-02-07",
      license: {
        id: "http://creativecommons.org/publicdomain/zero/1.0/",
      },
      publisher: {
        id: "https://oerworldmap.org/resource/urn:uuid:fd06253e-fe67-4910-b923-51db9d27e59f",
      },
      title: {
        de: "Hochschulcampus Ressourcentypen",
        en: "Higher Education Resource Types",
        uk: "Типи ресурсів вищої освіти",
      },
      preferredNamespacePrefix: "hcrt",
      preferredNamespaceUri: {
        id: "https://w3id.org/kim/hcrt/",
      },
      hasTopConcept: [
        {
          id: "https://w3id.org/kim/hcrt/application",
        },
        {
          id: "https://w3id.org/kim/hcrt/assessment",
        },
        {
          id: "https://w3id.org/kim/hcrt/audio",
        },
        {
          id: "https://w3id.org/kim/hcrt/case_study",
        },
        {
          id: "https://w3id.org/kim/hcrt/course",
        },
        {
          id: "https://w3id.org/kim/hcrt/data",
        },
        {
          id: "https://w3id.org/kim/hcrt/diagram",
        },
        {
          id: "https://w3id.org/kim/hcrt/drill_and_practice",
        },
        {
          id: "https://w3id.org/kim/hcrt/educational_game",
        },
        {
          id: "https://w3id.org/kim/hcrt/experiment",
        },
        {
          id: "https://w3id.org/kim/hcrt/image",
        },
        {
          id: "https://w3id.org/kim/hcrt/index",
        },
        {
          id: "https://w3id.org/kim/hcrt/lesson_plan",
        },
        {
          id: "https://w3id.org/kim/hcrt/map",
        },
        {
          id: "https://w3id.org/kim/hcrt/portal",
        },
        {
          id: "https://w3id.org/kim/hcrt/questionnaire",
        },
        {
          id: "https://w3id.org/kim/hcrt/script",
        },
        {
          id: "https://w3id.org/kim/hcrt/sheet_music",
        },
        {
          id: "https://w3id.org/kim/hcrt/simulation",
        },
        {
          id: "https://w3id.org/kim/hcrt/slide",
        },
        {
          id: "https://w3id.org/kim/hcrt/text",
        },
        {
          id: "https://w3id.org/kim/hcrt/textbook",
        },
        {
          id: "https://w3id.org/kim/hcrt/video",
        },
        {
          id: "https://w3id.org/kim/hcrt/web_page",
        },
        {
          id: "https://w3id.org/kim/hcrt/worksheet",
        },
        {
          id: "https://w3id.org/kim/hcrt/other",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/application",
      type: "Concept",
      prefLabel: {
        de: "Softwareanwendung",
        en: "Software Application",
        uk: "Програмне забезпечення",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/assessment",
      type: "Concept",
      altLabel: {
        de: [
          "Assessment",
        ],
      },
      prefLabel: {
        de: "Lernkontrolle",
        en: "Assessment",
        uk: "Оцінювання",
      },
      scopeNote: {
        de: "unter anderem (Selbst-)Tests",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/audio",
      type: "Concept",
      altLabel: {
        de: [
          "Tonaufnahme",
        ],
        uk: [
          "Звукозапис",
        ],
      },
      prefLabel: {
        de: "Audio",
        en: "Audio Recording",
        uk: "Аудіозапис",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/case_study",
      type: "Concept",
      prefLabel: {
        de: "Fallstudie",
        en: "Case Study",
        uk: "Приклад",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/course",
      type: "Concept",
      prefLabel: {
        de: "Kurs",
        en: "Course",
        uk: "Курс",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/data",
      type: "Concept",
      prefLabel: {
        de: "Daten",
        en: "Data",
        uk: "Дані",
      },
      scopeNote: {
        de: "unter anderem Roh- oder Beispieldaten",
        en: "amongst others raw and example data",
        uk: "включно з необробленими даними та зразками",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/diagram",
      type: "Concept",
      altLabel: {
        de: [
          "Grafik",
        ],
        uk: [
          "Графіка",
        ],
      },
      prefLabel: {
        de: "Diagramm",
        en: "Diagram",
        uk: "Діаграма",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/drill_and_practice",
      type: "Concept",
      prefLabel: {
        de: "Übung",
        en: "Drill and Practice",
        uk: "Практика",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/educational_game",
      type: "Concept",
      prefLabel: {
        de: "Lernspiel",
        en: "Game",
        uk: "Навчальна гра",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/experiment",
      type: "Concept",
      prefLabel: {
        de: "Experiment",
        en: "Experiment",
        uk: "Експеримент",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/image",
      type: "Concept",
      altLabel: {
        de: [
          "Bild",
        ],
        uk: [
          "Зображення",
        ],
      },
      prefLabel: {
        de: "Abbildung",
        en: "Image",
        uk: "Ілюстрація",
      },
      scopeNote: {
        de: "Fotos, Grafiken und sonstige Bilder",
        en: "photos, graphics, and other images",
        uk: "Фотографії, графіки та інші зображення",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/index",
      type: "Concept",
      prefLabel: {
        de: "Nachschlagewerk",
        en: "Reference Work",
        uk: "Довідник",
      },
      scopeNote: {
        de: "zum Beispiel Glossar, Enzyklopädie, Lexikon",
        en: "e.g.glossary, encyclopedia, dictionary",
        uk: "наприклад, глосарій, енциклопедія, словник",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/lesson_plan",
      type: "Concept",
      prefLabel: {
        de: "Unterrichtsplanung",
        en: "Lesson Plan",
        uk: "План уроку",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/map",
      type: "Concept",
      prefLabel: {
        de: "Karte",
        en: "Map",
        uk: "Мапа",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/portal",
      type: "Concept",
      prefLabel: {
        de: "Portal",
        en: "Web Portal",
        uk: "Портал",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/questionnaire",
      type: "Concept",
      prefLabel: {
        de: "Fragebogen",
        en: "Questionnaire",
        uk: "Анкета",
      },
      scopeNote: {
        de: "auch Rechercheauftrag und WebQuest",
        en: "also research assignment and WebQuest",
        uk: "також дослідницьке завдання та веб-квест",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/script",
      type: "Concept",
      prefLabel: {
        de: "Skript",
        en: "Script",
        uk: "Запис",
      },
      scopeNote: {
        de: "zum Beispiel Vorlesungsskript",
        en: "for example lecture notes",
        uk: "наприклад конспект лекцій",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/sheet_music",
      type: "Concept",
      prefLabel: {
        de: "Musiknoten",
        en: "Sheet Music",
        uk: "Ноти",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/simulation",
      type: "Concept",
      prefLabel: {
        de: "Simulation",
        en: "Simulation",
        uk: "Симуляція",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/slide",
      type: "Concept",
      prefLabel: {
        de: "Präsentation",
        en: "Presentation",
        uk: "Презентація",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/text",
      type: "Concept",
      prefLabel: {
        de: "Textdokument",
        en: "Text",
        uk: "Текстовий документ",
      },
      scopeNote: {
        de: "zum Beispiel Artikel, Aufsatz, Abhandlung",
        en: "for example article, essay",
        uk: "наприклад, стаття, есе, трактат",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/textbook",
      type: "Concept",
      prefLabel: {
        de: "Lehrbuch",
        en: "Textbook",
        uk: "Підручник",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/video",
      type: "Concept",
      prefLabel: {
        de: "Video",
        en: "Video",
        uk: "Відео",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/web_page",
      type: "Concept",
      prefLabel: {
        de: "Webseite",
        en: "Web Page",
        uk: "Веб-сайт",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/worksheet",
      type: "Concept",
      prefLabel: {
        de: "Arbeitsmaterial",
        en: "Worksheet",
        uk: "Робочий матеріал",
      },
      scopeNote: {
        de: "zum Beispiel Arbeitsblatt",
        uk: "наприклад робочий аркуш",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
    {
      id: "https://w3id.org/kim/hcrt/other",
      type: "Concept",
      prefLabel: {
        de: "Sonstiges",
        en: "Other",
        uk: "Різне",
      },
      topConceptOf: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      inScheme: [
        {
          id: "https://w3id.org/kim/hcrt/scheme",
        },
      ],
      dataset: "https://w3id.org/kim/hcrt/scheme",
      account: "test",
    },
  ],
}