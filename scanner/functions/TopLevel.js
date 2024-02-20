function TopLevel(...children) {
  return Route(
    {
      name: '-top-level',
      args: Args(),
      instance: Undefined(),
      template: /^packages\/.+\/templates\/outlet\.hbs$/,
    },
    ...children
  );
}