Module.register("MMM-StudyProgress", {
  defaults: {
    dataPath: "modules/MMM-StudyProgress/data/study.json",
    showPlanned: true
  },

  start: function () {
    this.studyData = null;
    this.sendSocketNotification("LOAD_STUDY_DATA", this.config.dataPath);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "STUDY_DATA") {
      this.studyData = payload;
      this.updateDom();
    }
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.classList.add("mmm-study-wrapper");

    if (!this.studyData) {
      wrapper.innerHTML = "Lade Studienverlauf...";
      return wrapper;
    }

    const header = document.createElement("div");
    header.classList.add("mmm-study-header");

    const earned = this.getEarnedEcts();
    header.innerHTML =
      this.studyData.program +
      " – " +
      earned +
      " / " +
      this.studyData.ects_total +
      " ECTS";
    wrapper.appendChild(header);

    const progressBar = this.createProgressBar(earned, this.studyData.ects_total);
    wrapper.appendChild(progressBar);

    this.studyData.semesters.forEach((sem) => {

      // Erst offene Module herausfiltern
      const openModules = sem.modules.filter((m) => {
      return m.status === "registered" || m.status === "planned";
      });

      // Wenn in diesem Semester keine offenen Prüfungen -> komplett überspringen
      if (openModules.length === 0) {
        return;
      }

      const semesterEl = document.createElement("div");
      semesterEl.classList.add("mmm-study-semester");

      const semTitle = document.createElement("div");
      semTitle.classList.add("mmm-study-semester-title");
      semTitle.innerHTML = sem.name;
      semesterEl.appendChild(semTitle);

      const list = document.createElement("table");
      list.classList.add("mmm-study-table");

      sem.modules.forEach((m) => {
        if (m.status !== "registered" && m.status !== "planned") {
          return;
        }

        const row = document.createElement("tr");
        row.classList.add("mmm-study-row", "status-" + m.status);

        const nameCell = document.createElement("td");
        nameCell.classList.add("mmm-study-name", "mmm-study-right");
        nameCell.innerHTML = m.name;

        const ectsCell = document.createElement("td");
        ectsCell.classList.add("mmm-study-ects", "mmm-study-right");
        ectsCell.innerHTML = m.ects + " ECTS";

        const gradeCell = document.createElement("td");
        gradeCell.classList.add("mmm-study-grade", "mmm-study-right");
        gradeCell.innerHTML = m.grade ? m.grade.toFixed(1) : "-";

        const statusCell = document.createElement("td");
        statusCell.classList.add("mmm-study-status");
        statusCell.innerHTML = this.translateStatus(m.status);

        row.appendChild(nameCell);
        row.appendChild(ectsCell);
        row.appendChild(gradeCell);
        row.appendChild(statusCell);

        list.appendChild(row);
      });

      semesterEl.appendChild(list);
      wrapper.appendChild(semesterEl);
    });

    // Durchschnittsnote anzeigen
    const averageGrade = this.calculateAverageGrade();
    if (averageGrade !== null) {
      const avgContainer = document.createElement("div");
      avgContainer.classList.add("mmm-study-average");
      avgContainer.innerHTML = "Durchschnittsnote: <strong>" + averageGrade.toFixed(2) + "</strong>";
      wrapper.appendChild(avgContainer);
    }

    return wrapper;
  },

  getEarnedEcts: function () {
    let sum = 0;
    if (!this.studyData || !this.studyData.semesters) return sum;

    this.studyData.semesters.forEach((sem) => {
      sem.modules.forEach((m) => {
        if (m.status === "passed") {
          sum += m.ects;
        }
      });
    });

    return sum;
  },

  calculateAverageGrade: function () {
    if (!this.studyData || !this.studyData.semesters) return null;

    let totalGrade = 0;
    let totalEcts = 0;

    this.studyData.semesters.forEach((sem) => {
      sem.modules.forEach((m) => {
        if (m.grade !== null && m.status === "passed") {
          totalGrade += m.grade * m.ects;
          totalEcts += m.ects;
        }
      });
    });

    return totalEcts > 0 ? totalGrade / totalEcts : null;
  },

  translateStatus: function (status) {
    switch (status) {
      case "passed":
        return "bestanden";
      case "registered":
        return "angemeldet";
      case "planned":
        return "geplant";
      default:
        return status;
    }
  },

  createProgressBar: function (earned, total) {
    const container = document.createElement("div");
    container.classList.add("mmm-study-progress-container");

    const bar = document.createElement("div");
    bar.classList.add("mmm-study-progress-bar");

    const fill = document.createElement("div");
    fill.classList.add("mmm-study-progress-fill");

    const pct = total > 0 ? Math.min(100, (earned / total) * 100) : 0;
    fill.style.width = pct + "%";

    const label = document.createElement("span");
    label.classList.add("mmm-study-progress-label");
    label.innerHTML = pct.toFixed(1) + "%";

    bar.appendChild(fill);
    bar.appendChild(label);
    container.appendChild(bar);

    return container;
  },

  getStyles: function () {
    return ["MMM-StudyProgress.css"];
  }
});
