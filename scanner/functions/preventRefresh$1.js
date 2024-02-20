function preventRefresh$1(source, delaySec) {
      var getMetaElements = function getMetaElements() {
        var metaNodes = [];
        try {
          metaNodes = document.querySelectorAll('meta[http-equiv="refresh" i][content]');
        } catch (e) {
          // 'i' attribute flag is problematic in Edge 15
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
          var contentString = meta.getAttribute('content');
          if (contentString.length === 0) {
            return null;
          }
          var contentDelay;
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv
          var limiterIndex = contentString.indexOf(';');
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
        // Check if "delays" array is empty, may happens when meta's content is invalid
        // and reduce() method cannot be used with empty arrays without initial value
        if (!delays.length) {
          return null;
        }
        // Get smallest delay of all metas on the page
        var minDelay = delays.reduce(function (a, b) {
          return Math.min(a, b);
        });
        // eslint-disable-next-line consistent-return
        return minDelay;
      };
      var stop = function stop() {
        var metaElements = getMetaElements();
        if (metaElements.length === 0) {
          return;
        }
        var secondsToRun = getNumberFromString(delaySec);
        // Check if argument is provided
        if (secondsToRun === null) {
          secondsToRun = getMetaContentDelay(metaElements);
        }
        // Check if meta tag has delay
        if (secondsToRun === null) {
          return;
        }
        var delayMs = secondsToRun * 1000;
        setTimeout(function () {
          window.stop();
          hit(source);
        }, delayMs);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', stop, {
          once: true
        });
      } else {
        stop();
      }
    }