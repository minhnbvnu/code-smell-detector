function preventBab(source) {
        var nativeSetTimeout = window.setTimeout;
        var babRegex = /\.bab_elementid.$/;
        var timeoutWrapper = function timeoutWrapper(callback) {
          if (typeof callback !== "string" || !babRegex.test(callback)) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            return nativeSetTimeout.apply(window, [callback, ...args]);
          }
          hit(source);
        };
        window.setTimeout = timeoutWrapper;
        var signatures = [["blockadblock"], ["babasbm"], [/getItem\('babn'\)/], ["getElementById", "String.fromCharCode", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", "charAt", "DOMContentLoaded", "AdBlock", "addEventListener", "doScroll", "fromCharCode", "<<2|r>>4", "sessionStorage", "clientWidth", "localStorage", "Math", "random"]];
        var check = function check(str) {
          if (typeof str !== "string") {
            return false;
          }
          for (var i = 0; i < signatures.length; i += 1) {
            var tokens = signatures[i];
            var match = 0;
            for (var j = 0; j < tokens.length; j += 1) {
              var token = tokens[j];
              var found = token instanceof RegExp ? token.test(str) : str.includes(token);
              if (found) {
                match += 1;
              }
            }
            if (match / tokens.length >= .8) {
              return true;
            }
          }
          return false;
        };
        var nativeEval = window.eval;
        var evalWrapper = function evalWrapper(str) {
          if (!check(str)) {
            return nativeEval(str);
          }
          hit(source);
          var bodyEl = document.body;
          if (bodyEl) {
            bodyEl.style.removeProperty("visibility");
          }
          var el = document.getElementById("babasbmsgx");
          if (el) {
            el.parentNode.removeChild(el);
          }
        };
        window.eval = evalWrapper.bind(window);
      }