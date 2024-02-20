function injectCssInShadowDom(source, cssRule) {
        var hostSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        if (!Element.prototype.attachShadow || typeof Proxy === "undefined" || typeof Reflect === "undefined") {
          return;
        }
        if (cssRule.match(/(url|image-set)\(.*\)/i)) {
          logMessage(source, '"url()" function is not allowed for css rules');
          return;
        }
        var callback = function callback(shadowRoot) {
          try {
            var stylesheet = new CSSStyleSheet();
            try {
              stylesheet.insertRule(cssRule);
            } catch (e) {
              logMessage(source, "Unable to apply the rule '".concat(cssRule, "' due to: \n'").concat(e.message, "'"));
              return;
            }
            shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, stylesheet];
          } catch (_unused) {
            var styleTag = document.createElement("style");
            styleTag.innerText = cssRule;
            shadowRoot.appendChild(styleTag);
          }
          hit(source);
        };
        hijackAttachShadow(window, hostSelector, callback);
      }