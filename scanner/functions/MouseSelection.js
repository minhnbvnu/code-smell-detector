function MouseSelection (bridge, container, isRoot, annotations) {
      var cursor = Option.none();
      var clearState = function () {
        cursor = Option.none();
      };
      var mousedown = function (event) {
        annotations.clear(container);
        cursor = findCell(event.target(), isRoot);
      };
      var mouseover = function (event) {
        cursor.each(function (start) {
          annotations.clearBeforeUpdate(container);
          findCell(event.target(), isRoot).each(function (finish) {
            identify(start, finish, isRoot).each(function (cellSel) {
              var boxes = cellSel.boxes.getOr([]);
              if (boxes.length > 1 || boxes.length === 1 && !eq(start, finish)) {
                annotations.selectRange(container, boxes, cellSel.start, cellSel.finish);
                bridge.selectContents(finish);
              }
            });
          });
        });
      };
      var mouseup = function (_event) {
        cursor.each(clearState);
      };
      return {
        mousedown: mousedown,
        mouseover: mouseover,
        mouseup: mouseup
      };
    }