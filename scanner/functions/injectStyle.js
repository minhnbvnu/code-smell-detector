function injectStyle(style, method) {
        method =
          method ||
          function(element) {
            document.head.appendChild(element);
          };

        var styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        styleElement.id = styleId;
        method(styleElement);
        return styleElement;
      }