# MMM-StudyProgress

Ein MagicMirror² Modul, das den persönlichen Studienverlauf anzeigt (offene Prüfungen, ECTS-Fortschritt, Semesterübersicht).

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/dwarfTheZwerg/MMM-StudyProgress.git
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
        { "name": "Math I", "ects": 5, "grade": 1.0, "status": "passed" },
        { "name": "Physics", "ects": 5, "grade": 3.7, "status": "passed" },
        { "name": "Eleictrical Engineering", "ects": 5, "grade": 3.3, "status": "passed" }
      ]
    },
    {
      "name": "SS 2023",
      "modules": [
        { "name": "Math II", "ects": 5, "grade": null, "status": "planned" },
        { "name": "Mechanics I", "ects": 5, "grade": null, "status": "planned" },
        { "name": "preliminary", "ects": 5, "grade": null, "status": "registered" }
      ]
    },
  ]
}

```

