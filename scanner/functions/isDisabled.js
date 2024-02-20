function isDisabled(key) {
      //TODO rewrite
      /*if (instance.blockedCols.main.find('th.htRowHeader.active').length && (key === "remove_col" || key === "col_left" || key === "col_right")) {
       return true;
       }
       else if (instance.blockedRows.main.find('th.htColHeader.active').length && (key === "remove_row" || key === "row_above" || key === "row_below")) {
       return true;
       }
       else*/
      if (instance.countRows() >= instance.getSettings().maxRows && (key === "row_above" || key === "row_below")) {
        return true;
      }
      else if (instance.countCols() >= instance.getSettings().maxCols && (key === "col_left" || key === "col_right")) {
        return true;
      }
      else {
        return false;
      }
    }