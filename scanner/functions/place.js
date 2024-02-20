function place(brick, cols) {
      var minY = Math.min.apply(Math, cols),
          len = cols.length,
          shortest = 0;
      for (var i = 0; i < len; i++) {
        if (cols[i] === minY) {
          shortest = i;
          break;
        }
      }

      brick.column = shortest;
      brick.x = columnWidth * shortest;
      brick.y = minY;

      var setHeight = minY + brick.height,
          setSpan = columnCount + 1 - len;
      for (i = 0; i < setSpan; i++) {
        columns[shortest + i] = setHeight;
      }

      outerHeight = Math.max.apply(Math, columns);
      // XXX set outerWidth?
      outerWidth = Math.max(outerWidth, brick.x + brick.width);
    }