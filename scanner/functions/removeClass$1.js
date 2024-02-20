function removeClass$1(source, classNames, selector) {
      var applying = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'asap stay';
      if (!classNames) {
        return;
      }
      classNames = classNames.split(/\s*\|\s*/);
      var selectors = [];
      if (!selector) {
        selectors = classNames.map(function (className) {
          return ".".concat(className);
        });
      }
      var removeClassHandler = function removeClassHandler() {
        var nodes = new Set();
        if (selector) {
          var foundNodes = [];
          try {
            foundNodes = [].slice.call(document.querySelectorAll(selector));
          } catch (e) {
            logMessage(source, "Invalid selector arg: '".concat(selector, "'"));
          }
          foundNodes.forEach(function (n) {
            return nodes.add(n);
          });
        } else if (selectors.length > 0) {
          selectors.forEach(function (s) {
            var elements = document.querySelectorAll(s);
            for (var i = 0; i < elements.length; i += 1) {
              var element = elements[i];
              nodes.add(element);
            }
          });
        }
        var removed = false;
        nodes.forEach(function (node) {
          classNames.forEach(function (className) {
            if (node.classList.contains(className)) {
              node.classList.remove(className);
              removed = true;
            }
          });
        });
        if (removed) {
          hit(source);
        }
      };
      var CLASS_ATTR_NAME = ['class'];
      var flags = parseFlags(applying);
      var run = function run() {
        removeClassHandler();
        if (!flags.hasFlag(flags.STAY)) {
          return;
        }
        // 'true' for observing attributes
        // 'class' for observing only classes
        observeDOMChanges(removeClassHandler, true, CLASS_ATTR_NAME);
      };
      if (flags.hasFlag(flags.ASAP)) {
        // https://github.com/AdguardTeam/Scriptlets/issues/245
        // Call removeClassHandler on DOM content loaded
        // to ensure that target node is present on the page
        if (document.readyState === 'loading') {
          window.addEventListener('DOMContentLoaded', removeClassHandler, {
            once: true
          });
        } else {
          removeClassHandler();
        }
      }
      if (document.readyState !== 'complete' && flags.hasFlag(flags.COMPLETE)) {
        window.addEventListener('load', run, {
          once: true
        });
      } else if (flags.hasFlag(flags.STAY)) {
        // Only call removeClassHandler for single 'stay' flag
        if (!applying.includes(' ')) {
          removeClassHandler();
        }
        observeDOMChanges(removeClassHandler, true, CLASS_ATTR_NAME);
      }
    }