function withRequired(Component, props) {
  const getPropType = propName =>
    Component.props[propName].type || Component.props[propName];

  const requiredProps = Object.keys(props).reduce(
    (propsObject, propName) => ({
      ...propsObject,
      [propName]: {
        type: getPropType(propName),
        default() {
          return props[propName];
        },
      },
    }),
    {},
  );

  return {
    ...Component,
    name: `${Component.name}WithRequired`,
    props: {
      ...Component.props,
      ...requiredProps,
    },
  };
}