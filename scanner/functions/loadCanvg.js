function loadCanvg() {
    return (function() {
      if (globalObject["canvg"]) {
        return Promise.resolve(globalObject["canvg"]);
      }


      if (typeof exports === "object" && typeof module !== "undefined") {
        return new Promise(function(resolve, reject) {
          try {
            resolve(require("canvg"));
          } catch (e) {
            reject(e);
          }
        });
      }
      if (typeof define === "function" && define.amd) {
        return new Promise(function(resolve, reject) {
          try {
            require(["canvg"], resolve);
          } catch (e) {
            reject(e);
          }
        });
      }
      return Promise.reject(new Error("Could not load canvg"));
    })()
      .catch(function(e) {
        return Promise.reject(new Error("Could not load canvg: " + e));
      })
      .then(function(canvg) {
        return canvg.default ? canvg.default : canvg;
      });
  }