function removeInShadowDom$1(source, selector, baseSelector) {
      // do nothing if browser does not support ShadowRoot
      // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
      if (!Element.prototype.attachShadow) {
        return;
      }
      var removeElement = function removeElement(targetElement) {
        targetElement.remove();
      };

      /**
       * Handles shadow-dom piercing and removing of found elements
       */
      var removeHandler = function removeHandler() {
        // start value of shadow-dom hosts for the page dom
        var hostElements = !baseSelector ? findHostElements(document.documentElement) : document.querySelectorAll(baseSelector);

        // if there is shadow-dom host, they should be explored
        var _loop = function _loop() {
          var isRemoved = false;
          var _pierceShadowDom = pierceShadowDom(selector, hostElements),
            targets = _pierceShadowDom.targets,
            innerHosts = _pierceShadowDom.innerHosts;
          targets.forEach(function (targetEl) {
            removeElement(targetEl);
            isRemoved = true;
          });
          if (isRemoved) {
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
      removeHandler();
      observeDOMChanges(removeHandler, true);
    }