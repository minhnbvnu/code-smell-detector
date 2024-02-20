function hideInShadowDom(source, selector, baseSelector) {
        if (!Element.prototype.attachShadow) {
          return;
        }
        var hideElement = function hideElement(targetElement) {
          var DISPLAY_NONE_CSS = "display:none!important;";
          targetElement.style.cssText = DISPLAY_NONE_CSS;
        };
        var hideHandler = function hideHandler() {
          var hostElements = !baseSelector ? findHostElements(document.documentElement) : document.querySelectorAll(baseSelector);
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
            hostElements = innerHosts;
          };
          while (hostElements.length !== 0) {
            _loop();
          }
        };
        hideHandler();
        observeDOMChanges(hideHandler, true);
      }