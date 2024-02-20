function getNextOption() {
      var atBottom = index === getLastOption().index;
      return atBottom ? rotate ? getFirstOption() : selectableDescendants[selectableIndex] : selectableDescendants[(selectableIndex + 1) % selectableDescendants.length];
    }