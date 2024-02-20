function injectScrollStyle(styleId, containerClass) {
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

      if (!document.getElementById(styleId)) {
        var containerAnimationClass = containerClass + '_animation';
        var containerAnimationActiveClass = containerClass + '_animation_active';
        var style = '/* Created by the element-resize-detector library. */\n';
        style += '.' + containerClass + ' > div::-webkit-scrollbar { display: none; }\n\n';
        style +=
          '.' +
          containerAnimationActiveClass +
          ' { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: ' +
          containerAnimationClass +
          '; animation-name: ' +
          containerAnimationClass +
          '; }\n';
        style +=
          '@-webkit-keyframes ' +
          containerAnimationClass +
          ' { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n';
        style +=
          '@keyframes ' + containerAnimationClass + ' { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }';
        injectStyle(style);
      }
    }