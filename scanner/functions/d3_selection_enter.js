function d3_selection_enter(selection) {
    d3_arraySubclass(selection, d3_selection_enterPrototype);
    return selection;
  }