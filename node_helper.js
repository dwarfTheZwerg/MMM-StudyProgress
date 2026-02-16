const NodeHelper = require("node_helper");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    if (notification === "LOAD_STUDY_DATA") {
      const filePath = path.resolve(global.root_path, payload);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("MMM-StudyProgress: Fehler beim Lesen der Datei:", err);
          return;
        }
        try {
          const json = JSON.parse(data);
          this.sendSocketNotification("STUDY_DATA", json);
        } catch (e) {
          console.error("MMM-StudyProgress: Fehler beim Parsen von JSON:", e);
        }
      });
    }
  }
});
