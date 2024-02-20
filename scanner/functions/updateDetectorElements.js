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