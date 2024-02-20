function storeStartSize() {
        var style = getStyle();
        getState(element).startSize = {
          width: style.width,
          height: style.height,
        };
        debug('Element start size', getState(element).startSize);
      }