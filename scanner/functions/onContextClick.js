function onContextClick(key) {
      var corners = instance.getSelected(); //[selection start row, selection start col, selection end row, selection end col]

      if (!corners) {
        return; //needed when there are 2 grids on a page
      }

      /**
       * `selection` variable contains normalized selection coordinates.
       * selection.start - top left corner of selection area
       * selection.end - bottom right corner of selection area
       */

      var selection = {
        start: new Handsontable.SelectionPoint(),
        end: new Handsontable.SelectionPoint()
      };

      selection.start.row(Math.min(corners[0], corners[2]));
      selection.start.col(Math.min(corners[1], corners[3]));

      selection.end.row(Math.max(corners[0], corners[2]));
      selection.end.col(Math.max(corners[1], corners[3]));

      switch (key) {
        case "row_above":
          instance.alter("insert_row", selection.start.row());
          break;

        case "row_below":
          instance.alter("insert_row", selection.end.row() + 1);
          break;

        case "col_left":
          instance.alter("insert_col", selection.start.col());
          break;

        case "col_right":
          instance.alter("insert_col", selection.end.col() + 1);
          break;

        case "remove_row":
          instance.alter(key, selection.start.row(), (selection.end.row() - selection.start.row()) + 1);
          break;

        case "remove_col":
          instance.alter(key, selection.start.col(), (selection.end.col() - selection.start.col()) + 1);
          break;

        case "undo":
          instance.undo();
          break;

        case "redo":
          instance.redo();
          break;
      }
    }