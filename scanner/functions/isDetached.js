function isDetached(element) {
        function isInDocument(element) {
          return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
        }

        if (!isInDocument(element)) {
          return true;
        }

        // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520
        if (window.getComputedStyle(element) === null) {
          return true;
        }

        return false;
      }