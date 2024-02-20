function storeStyle() {
        debug('storeStyle invoked.');
        if (!getState(element)) {
          debug('Aborting because element has been uninstalled');
          return;
        }

        var style = getStyle();
        getState(element).style = style;
      }