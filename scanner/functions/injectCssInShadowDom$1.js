function injectCssInShadowDom$1(source, cssRule) {
      var hostSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      // do nothing if browser does not support ShadowRoot, Proxy or Reflect
      // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
      if (!Element.prototype.attachShadow || typeof Proxy === 'undefined' || typeof Reflect === 'undefined') {
        return;
      }

      // Prevent url() and image-set() styles from being applied
      if (cssRule.match(/(url|image-set)\(.*\)/i)) {
        logMessage(source, '"url()" function is not allowed for css rules');
        return;
      }
      var callback = function callback(shadowRoot) {
        try {
          // adoptedStyleSheets and CSSStyleSheet constructor are not yet supported by Safari
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets
          // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
          var stylesheet = new CSSStyleSheet();
          try {
            stylesheet.insertRule(cssRule);
          } catch (e) {
            logMessage(source, "Unable to apply the rule '".concat(cssRule, "' due to: \n'").concat(e.message, "'"));
            return;
          }
          shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, stylesheet];
        } catch (_unused) {
          var styleTag = document.createElement('style');
          styleTag.innerText = cssRule;
          shadowRoot.appendChild(styleTag);
        }
        hit(source);
      };
      hijackAttachShadow(window, hostSelector, callback);
    }