function masonic(d, i) {
      if (columns.length === 0) {
        columns = d3.range(columnCount).map(zero);
      }

      var w = getWidth.apply(this, arguments) || 0,
          h = getHeight.apply(this, arguments) || 0,
          span = Math.ceil(w / columnWidth),
          brick = {
            width: w,
            height: h,
            data: d
          };

      span = brick.span = Math.min(span, columnCount);

      if (span === 1) {
        place(brick, columns);
      } else {
        var groupCount = columnCount + 1 - span,
            groupY = [],
            groupColY;
        for (var i = 0; i < groupCount; i++) {
          groupColY = columns.slice(i, i + span);
          groupY[i] = Math.max.apply(Math, groupColY);
        }

        place(brick, groupY);
      }

      return brick;
    }