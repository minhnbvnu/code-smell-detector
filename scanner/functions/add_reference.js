function add_reference(scope, name2) {
    scope.references.add(name2);
    if (scope.parent)
      add_reference(scope.parent, name2);
  }