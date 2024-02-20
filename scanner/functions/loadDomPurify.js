function loadDomPurify() {
    return (function() {
      if (globalObject["DOMPurify"]) {
        return Promise.resolve(globalObject["DOMPurify"]);
      }


      if (typeof exports === "object" && typeof module !== "undefined") {
        return new Promise(function(resolve, reject) {
          try {
            resolve(require("dompurify"));
          } catch (e) {
            reject(e);
          }
        });
      }
      if (typeof define === "function" && define.amd) {
        return new Promise(function(resolve, reject) {
          try {
            require(["dompurify"], resolve);
          } catch (e) {
            reject(e);
          }
        });
      }
      return Promise.reject(new Error("Could not load dompurify"));
    })()
      .catch(function(e) {
        return Promise.reject(new Error("Could not load dompurify: " + e));
      })
      .then(function(dompurify) {
        return dompurify.default ? dompurify.default : dompurify;
      });
  }