function getMarkPos(cm, vim, markName) {
      if (markName == '\'' || markName == '`') {
        return vimGlobalState.jumpList.find(cm, -1) || Pos(0, 0);
      } else if (markName == '.') {
        return getLastEditPos(cm);
      }

      var mark = vim.marks[markName];
      return mark && mark.find();
    }