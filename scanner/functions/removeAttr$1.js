function removeAttr$1(source, attrs, selector) {
      var applying = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'asap stay';
      if (!attrs) {
        return;
      }
      attrs = attrs.split(/\s*\|\s*/);
      if (!selector) {
        selector = "[".concat(attrs.join('],['), "]");
      }
      var rmattr = function rmattr() {
        var nodes = [];
        try {
          nodes = [].slice.call(document.querySelectorAll(selector));
        } catch (e) {
          logMessage(source, "Invalid selector arg: '".concat(selector, "'"));
        }
        var removed = false;
        nodes.forEach(function (node) {
          attrs.forEach(function (attr) {
            node.removeAttribute(attr);
            removed = true;
          });
        });
        if (removed) {
          hit(source);
        }
      };
      var flags = parseFlags(applying);
      var run = function run() {
        rmattr();
        if (!flags.hasFlag(flags.STAY)) {
          return;
        }
        // 'true' for observing attributes
        observeDOMChanges(rmattr, true);
      };
      if (flags.hasFlag(flags.ASAP)) {
        // https://github.com/AdguardTeam/Scriptlets/issues/245
        // Call rmattr on DOM content loaded
        // to ensure that target node is present on the page
        if (document.readyState === 'loading') {
          window.addEventListener('DOMContentLoaded', rmattr, {
            once: true
          });
        } else {
          rmattr();
        }
      }
      if (document.readyState !== 'complete' && flags.hasFlag(flags.COMPLETE)) {
        window.addEventListener('load', run, {
          once: true
        });
      } else if (flags.hasFlag(flags.STAY)) {
        // Only call rmattr for single 'stay' flag
        if (!applying.includes(' ')) {
          rmattr();
        }
        // 'true' for observing attributes
        observeDOMChanges(rmattr, true);
      }
    }