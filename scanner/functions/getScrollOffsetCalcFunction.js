function getScrollOffsetCalcFunction(position, start) {
      if (position.endsWith('px')) {
        return scrollOffsetConst.bind(null,
            parseFloat(position.substring(0, position.length - 2)));
      } else if (position.endsWith('%')) {
        return scrollOffsetPercent.bind(null,
            Math.max(0, Math.min(1,
                (parseFloat(position.substring(0, position.length - 1)) / 100))));
      } else if (position == 'auto') {
        if (start) {
          return scrollOffsetConst.bind(null, 0);
        } else {
          return scrollOffsetPercent.bind(null, 1);
        }
      } else {
        throw new Error('Unknown scroll position: ' + position);
      }
    }