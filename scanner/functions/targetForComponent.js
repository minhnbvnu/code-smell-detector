function targetForComponent(component) {
    return get(component, '_target') || get(component, '_targetObject');
  }