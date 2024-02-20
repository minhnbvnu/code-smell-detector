function preventRefresh(source, delaySec) {
        var getMetaElements = function getMetaElements() {
          var metaNodes = [];
          try {
            metaNodes = document.querySelectorAll('meta[http-equiv="refresh" i][content]');
          } catch (e) {
            try {
              metaNodes = document.querySelectorAll('meta[http-equiv="refresh"][content]');
            } catch (e) {
              logMessage(source, e);
            }
          }
          return Array.from(metaNodes);
        };
        var getMetaContentDelay = function getMetaContentDelay(metaElements) {
          var delays = metaElements.map(function (meta) {
            var contentString = meta.getAttribute("content");
            if (contentString.length === 0) {
              return null;
            }
            var contentDelay;
            var limiterIndex = contentString.indexOf(";");
            if (limiterIndex !== -1) {
              var delaySubstring = contentString.substring(0, limiterIndex);
              contentDelay = getNumberFromString(delaySubstring);
            } else {
              contentDelay = getNumberFromString(contentString);
            }
            return contentDelay;
          }).filter(function (delay) {
            return delay !== null;
          });
          if (!delays.length) {
            return null;
          }
          var minDelay = delays.reduce(function (a, b) {
            return Math.min(a, b);
          });
          return minDelay;
        };
        var stop = function stop() {
          var metaElements = getMetaElements();
          if (metaElements.length === 0) {
            return;
          }
          var secondsToRun = getNumberFromString(delaySec);
          if (secondsToRun === null) {
            secondsToRun = getMetaContentDelay(metaElements);
          }
          if (secondsToRun === null) {
            return;
          }
          var delayMs = secondsToRun * 1e3;
          setTimeout(function () {
            window.stop();
            hit(source);
          }, delayMs);
        };
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", stop, {
            once: true
          });
        } else {
          stop();
        }
      }