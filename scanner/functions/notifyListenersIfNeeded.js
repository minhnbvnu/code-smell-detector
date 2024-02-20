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