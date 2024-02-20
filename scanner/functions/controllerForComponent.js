function controllerForComponent(component) {
    let target = component;

    while (target && !(target instanceof Controller)) {
      target = targetForComponent(target);
    }

    return target;
  }