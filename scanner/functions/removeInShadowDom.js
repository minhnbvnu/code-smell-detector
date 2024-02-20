function removeInShadowDom(source, selector, baseSelector) {
        if (!Element.prototype.attachShadow) {
          return;
        }
        var removeElement = function removeElement(targetElement) {
          targetElement.remove();
        };
        var removeHandler = function removeHandler() {
          var hostElements = !baseSelector ? findHostElements(document.documentElement) : document.querySelectorAll(baseSelector);
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
            hostElements = innerHosts;
          };
          while (hostElements.length !== 0) {
            _loop();
          }
        };
        removeHandler();
        observeDOMChanges(removeHandler, true);
      }