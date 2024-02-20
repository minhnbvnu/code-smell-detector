function handleMjmlProps(props) {
  return Object.keys(props).reduce((acc, curr) => {
    const mjmlProp = kebabCase(curr);
    return {
      ...acc,
      [mjmlProp]: handleMjmlProp(mjmlProp, props[curr]),
    };
  }, {});
}