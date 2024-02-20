function templateForComponent(component) {
    let layout = get(component, 'layout');

    if (layout) {
      return nameForTemplate(layout);
    }

    let layoutName = get(component, 'layoutName');

    if (layoutName) {
      let owner = getOwner(component);
      let template = owner.lookup(`template:${layoutName}`);
      return nameForTemplate(template);
    }

    return null;
  }