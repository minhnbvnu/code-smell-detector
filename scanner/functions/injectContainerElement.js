function injectContainerElement() {
        var container = getState(element).container;

        if (!container) {
          container = document.createElement('div');
          container.className = detectionContainerClass;
          container.style.cssText =
            'visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden; margin: 0; padding: 0;';
          getState(element).container = container;
          addAnimationClass(container);
          element.appendChild(container);

          var onAnimationStart = function() {
            getState(element).onRendered && getState(element).onRendered();
          };

          addEvent(container, 'animationstart', onAnimationStart);

          // Store the event handler here so that they may be removed when uninstall is called.
          // See uninstall function for an explanation why it is needed.
          getState(element).onAnimationStart = onAnimationStart;
        }

        return container;
      }