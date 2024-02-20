function loadHtml2Canvas() {
    return (function() {
      if (globalObject["html2canvas"]) {
        return Promise.resolve(globalObject["html2canvas"]);
      }


      if (typeof exports === "object" && typeof module !== "undefined") {
        return new Promise(function(resolve, reject) {
          try {
            resolve(require("html2canvas"));
          } catch (e) {
            reject(e);
          }
        });
      }
      if (typeof define === "function" && define.amd) {
        return new Promise(function(resolve, reject) {
          try {
            require(["html2canvas"], resolve);
          } catch (e) {
            reject(e);
          }
        });
      }
      return Promise.reject(new Error("Could not load html2canvas"));
    })()
      .catch(function(e) {
        return Promise.reject(new Error("Could not load html2canvas: " + e));
      })
      .then(function(html2canvas) {
        return html2canvas.default ? html2canvas.default : html2canvas;
      });
  }