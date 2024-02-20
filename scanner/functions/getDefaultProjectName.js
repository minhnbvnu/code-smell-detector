function getDefaultProjectName(name, features) {
  return `${name}-${_.kebabCase(_.sortBy(features))}`;
}