function switchState(source, setState, f) {
    setState(f);
    return f(source, setState);
  }