function handleRender() {
          debug('startanimation triggered.');

          if (isUnrendered(element)) {
            debug('Ignoring since element is still unrendered...');
            return;
          }

          debug('Element rendered.');
          var expand = getExpandElement(element);
          var shrink = getShrinkElement(element);
          if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
            debug('Scrollbars out of sync. Updating detector elements...');
            updateDetectorElements(notifyListenersIfNeeded);
          }
        }