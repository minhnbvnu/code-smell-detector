function registerListenersAndPositionElements() {
        function updateChildSizes(element, width, height) {
          var expandChild = getExpandChildElement(element);
          var expandWidth = getExpandWidth(width);
          var expandHeight = getExpandHeight(height);
          expandChild.style.width = expandWidth + 'px';
          expandChild.style.height = expandHeight + 'px';
        }

        function updateDetectorElements(done) {
          var width = element.offsetWidth;
          var height = element.offsetHeight;

          debug('Storing current size', width, height);

          // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
          // Otherwise the if-check in handleScroll is useless.
          storeCurrentSize(element, width, height);

          // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
          // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

          batchProcessor.add(0, function performUpdateChildSizes() {
            if (!getState(element)) {
              debug('Aborting because element has been uninstalled');
              return;
            }

            if (!areElementsInjected()) {
              debug('Aborting because element container has not been initialized');
              return;
            }

            if (options.debug) {
              var w = element.offsetWidth;
              var h = element.offsetHeight;

              if (w !== width || h !== height) {
                reporter.warn(idHandler.get(element), 'Scroll: Size changed before updating detector elements.');
              }
            }

            updateChildSizes(element, width, height);
          });

          batchProcessor.add(1, function updateScrollbars() {
            if (!getState(element)) {
              debug('Aborting because element has been uninstalled');
              return;
            }

            if (!areElementsInjected()) {
              debug('Aborting because element container has not been initialized');
              return;
            }

            positionScrollbars(element, width, height);
          });

          if (done) {
            batchProcessor.add(2, function() {
              if (!getState(element)) {
                debug('Aborting because element has been uninstalled');
                return;
              }

              if (!areElementsInjected()) {
                debug('Aborting because element container has not been initialized');
                return;
              }

              done();
            });
          }
        }

        function areElementsInjected() {
          return !!getState(element).container;
        }

        function notifyListenersIfNeeded() {
          function isFirstNotify() {
            return getState(element).lastNotifiedWidth === undefined;
          }

          debug('notifyListenersIfNeeded invoked');

          var state = getState(element);

          // Don't notify the if the current size is the start size, and this is the first notification.
          if (
            isFirstNotify() &&
            state.lastWidth === state.startSize.width &&
            state.lastHeight === state.startSize.height
          ) {
            return debug('Not notifying: Size is the same as the start size, and there has been no notification yet.');
          }

          // Don't notify if the size already has been notified.
          if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
            return debug('Not notifying: Size already notified');
          }

          debug('Current size not notified, notifying...');
          state.lastNotifiedWidth = state.lastWidth;
          state.lastNotifiedHeight = state.lastHeight;
          forEach(getState(element).listeners, function(listener) {
            listener(element);
          });
        }

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

        function handleScroll() {
          debug('Scroll detected.');

          if (isUnrendered(element)) {
            // Element is still unrendered. Skip this scroll event.
            debug('Scroll event fired while unrendered. Ignoring...');
            return;
          }

          var width = element.offsetWidth;
          var height = element.offsetHeight;

          if (width !== getState(element).lastWidth || height !== getState(element).lastHeight) {
            debug('Element size changed.');
            updateDetectorElements(notifyListenersIfNeeded);
          } else {
            debug('Element size has not changed (' + width + 'x' + height + ').');
          }
        }

        debug('registerListenersAndPositionElements invoked.');

        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        getState(element).onRendered = handleRender;
        getState(element).onExpand = handleScroll;
        getState(element).onShrink = handleScroll;

        var style = getState(element).style;
        updateChildSizes(element, style.width, style.height);
      }