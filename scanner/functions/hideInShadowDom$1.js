function hideInShadowDom$1(source, selector, baseSelector) {
      // do nothing if browser does not support ShadowRoot
      // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
      if (!Element.prototype.attachShadow) {
        return;
      }
      var hideElement = function hideElement(targetElement) {
        var DISPLAY_NONE_CSS = 'display:none!important;';
        targetElement.style.cssText = DISPLAY_NONE_CSS;
      };

      /**
       * Handles shadow-dom piercing and hiding of found elements
       */
      var hideHandler = function hideHandler() {
        // start value of shadow-dom hosts for the page dom
        var hostElements = !baseSelector ? findHostElements(document.documentElement) : document.querySelectorAll(baseSelector);

        // if there is shadow-dom host, they should be explored
        var _loop = function _loop() {
          var isHidden = false;
          var _pierceShadowDom = pierceShadowDom(selector, hostElements),
            targets = _pierceShadowDom.targets,
            innerHosts = _pierceShadowDom.innerHosts;
          targets.forEach(function (targetEl) {
            hideElement(targetEl);
            isHidden = true;
          });
          if (isHidden) {
            hit(source);
          }

          // continue to pierce for inner shadow-dom hosts
          // and search inside them while the next iteration
          hostElements = innerHosts;
        };
        while (hostElements.length !== 0) {
          _loop();
        }
      };
      hideHandler();
      observeDOMChanges(hideHandler, true);
    }