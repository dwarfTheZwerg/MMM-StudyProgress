# MMM-StudyProgress

Ein MagicMirror² Modul, das den persönlichen Studienverlauf anzeigt (offene Prüfungen, ECTS-Fortschritt, Semesterübersicht).

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://codeberg.org/Zwerg/MMM-StudyProgress.git
cd MMM-StudyProgress
npm install
```

## Configuration

```bash
{
  module: "MMM-StudyProgress",
  position: "top_left",
  header: "Mein Studium",
  config: {
    dataPath: "modules/MMM-StudyProgress/data/study.json"
  }
}
```

## Example study.json
```bash
{
  "program": "Digital Engineering B.Sc.",
  "ects_total": 210,
  "semesters": [
    {
      "name": "WS 2022/23",
      "modules": [
        { "name": "Mathematik 1", "ects": 5, "grade": null, "status": "passed" },
        { "name": "Physik", "ects": 5, "grade": 3.7, "status": "passed" },
        { "name": "Elektrotechnik", "ects": 5, "grade": 3.3, "status": "passed" },
        { "name": "Werkstoffkunde", "ects": 5, "grade": 4.0, "status": "passed" },
        { "name": "Computational Thinking", "ects": 10, "grade": 1.7, "status": "passed" },
        { "name": "Allgemeinwissenschaftliches Wahlpflichtmodul", "ects": 4, "grade": 1.1, "status": "passed" }
      ]
    },
    {
      "name": "SS 2023",
      "modules": [
        { "name": "Mathematik 2", "ects": 5, "grade": 4.0, "status": "passed" },
        { "name": "Mechanik 1", "ects": 5, "grade": 3.7, "status": "passed" },
        { "name": "Fertigungstechnik", "ects": 5, "grade": 4.0, "status": "passed" },
        { "name": "Computer Systems Fundamentals", "ects": 5, "grade": 2.0, "status": "passed" },
        { "name": "Softwareentwicklung", "ects": 5, "grade": 3.0, "status": "passed" },
	      { "name": "Software Engineering", "ects": 5, "grade": 3.3, "status": "passed" }
      ]
    },
  ]
}
```