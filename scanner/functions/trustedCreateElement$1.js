function trustedCreateElement$1(source, parentSelector, tagName) {
      var attributePairs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var textContent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var cleanupDelayMs = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : NaN;
      if (!parentSelector || !tagName) {
        return;
      }

      /**
       * Prevent infinite loops when creating iframes
       * because scriptlet is automatically injected into the newly created iframe.
       */
      var IFRAME_WINDOW_NAME = 'trusted-create-element-window';
      if (window.name === IFRAME_WINDOW_NAME) {
        return;
      }
      var logError = function logError(prefix, error) {
        logMessage(source, "".concat(prefix, " due to ").concat(getErrorMessage(error)));
      };
      var element;
      try {
        element = document.createElement(tagName);
        element.textContent = textContent;
      } catch (e) {
        logError("Cannot create element with tag name '".concat(tagName, "'"), e);
        return;
      }
      var attributes = [];
      try {
        attributes = parseAttributePairs(attributePairs);
      } catch (e) {
        logError("Cannot parse attributePairs param: '".concat(attributePairs, "'"), e);
        return;
      }
      attributes.forEach(function (attr) {
        try {
          element.setAttribute(attr.name, attr.value);
        } catch (e) {
          logError("Cannot set attribute '".concat(attr.name, "' with value '").concat(attr.value, "'"), e);
        }
      });
      var timerId;

      /**
       * Finds parent element by `parentElSelector` and appends the `el` element to it.
       *
       * If `removeElDelayMs` is not `NaN`,
       * schedules the `el` element to be removed after `removeElDelayMs` milliseconds.
       *
       * @param parentElSelector CSS selector of the parent element.
       * @param el HTML element to append to the parent element.
       * @param removeElDelayMs Delay in milliseconds after which the `el` element is removed from the DOM.
       *
       * @returns True if the `el` element was successfully appended to the parent element, otherwise false.
       */
      var findParentAndAppendEl = function findParentAndAppendEl(parentElSelector, el, removeElDelayMs) {
        var parentEl;
        try {
          parentEl = document.querySelector(parentElSelector);
        } catch (e) {
          logError("Cannot find parent element by selector '".concat(parentElSelector, "'"), e);
          return false;
        }
        if (!parentEl) {
          logMessage(source, "No parent element found by selector: '".concat(parentElSelector, "'"));
          return false;
        }
        try {
          parentEl.append(el);
          if (el instanceof HTMLIFrameElement && el.contentWindow) {
            el.contentWindow.name = IFRAME_WINDOW_NAME;
          }
          hit(source);
        } catch (e) {
          logError("Cannot append child to parent by selector '".concat(parentElSelector, "'"), e);
          return false;
        }
        if (!nativeIsNaN(removeElDelayMs)) {
          timerId = setTimeout(function () {
            el.remove();
            clearTimeout(timerId);
          }, removeElDelayMs);
        }
        return true;
      };
      if (!findParentAndAppendEl(parentSelector, element, cleanupDelayMs)) {
        observeDocumentWithTimeout(function (mutations, observer) {
          if (findParentAndAppendEl(parentSelector, element, cleanupDelayMs)) {
            observer.disconnect();
          }
        });
      }
    }