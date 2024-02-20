function captureOutlet(path, owner, components, { outlets, render }) {
    let outlet = {
      id: `render-node:${path}@${render.outlet}`,
      type: 'outlet',
      name: render.outlet,
      args: EMPTY_ARGS,
      instance: undefined,
      template: null,
      bounds: null,
      children: [],
    };

    let parent = outlet;

    if (owner !== render.owner) {
      let engine = {
        id: `render-node:${guidFor(render.owner)}`,
        type: 'engine',
        name: render.owner.mountPoint,
        args: EMPTY_ARGS,
        instance: render.owner,
        template: null,
        bounds: null,
        children: [],
      };

      parent.children.push(engine);
      parent = engine;
    }

    let subpath = `${path}@${render.outlet}/${render.name}`;

    let route = {
      id: `render-node:${subpath}`,
      type: 'route-template',
      name: render.name,
      args: EMPTY_ARGS,
      instance: render.controller,
      template: nameForTemplate(render.template),
      bounds: null,
      children: [],
    };

    parent.children.push(route);
    parent = route;

    let childOutlets = Object.keys(outlets).map((name) =>
      captureOutlet(subpath, render.owner, components, outlets[name])
    );

    let childComponents = captureComponents(
      components.get(render.controller) || [],
      render.controller
    );

    parent.children.push(
      ...mergeOutletChildren(render.controller, childOutlets, childComponents)
    );

    return outlet;
  }