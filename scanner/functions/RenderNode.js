function RenderNode(
  {
    id = RenderNodeID(),
    type,
    name,
    args = Args(),
    instance = Any(),
    template = /^.+\.hbs$/,
    bounds = ['single', 'range', null],
  },
  ...children
) {
  return (actual) => {
    match(actual.id, id);
    match(actual.type, type, `${name} should have correct type`);
    match(actual.name, name, `${name} should have correct name`);
    match(actual.args, args);
    match(
      actual.instance,
      instance,
      `${name} ${type} should have correct instance`
    );
    match(
      actual.template,
      template,
      `${name} ${type} should have correct template`
    );
    match(actual.bounds, bounds, `${name} ${type} should have correct bounds`);
    matchTree(actual.children, children, `${name} ${type}`);
  };
}