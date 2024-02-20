function captureComponents(components, controller) {
    return components
      .filter((component) => controllerForComponent(component) === controller)
      .map((component) => ({
        id: `render-node:${guidFor(component)}`,
        type: 'component',
        name: nameForComponent(component),
        args: EMPTY_ARGS,
        instance: component,
        template: templateForComponent(component),
        bounds: getViewBounds(component),
        children: captureComponents(getChildViews(component), controller),
      }));
  }