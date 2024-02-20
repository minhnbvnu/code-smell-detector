function finalizeDomMutation() {
        debug('finalizeDomMutation invoked.');

        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        var style = getState(element).style;
        storeCurrentSize(element, style.width, style.height);
        positionScrollbars(element, style.width, style.height);
      }