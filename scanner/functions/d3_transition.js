function d3_transition(groups, id) {
    d3_arraySubclass(groups, d3_transitionPrototype);
    groups.id = id;
    return groups;
  }