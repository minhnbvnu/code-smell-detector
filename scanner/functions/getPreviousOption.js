function getPreviousOption() {
      var atTop = index === getFirstOption().index;
      return atTop ? rotate ? getLastOption() : selectableDescendants[selectableIndex] : selectableDescendants[(selectableIndex - 1 + selectableDescendants.length) % selectableDescendants.length];
    }