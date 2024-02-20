function default_prelude(options) {
        return `\
(function(root, factory) {
  ${options?.global != null ? `root[${str(options.global)}] = factory()` : "Object.assign(root, factory())"};
})(this, function() {
  const parent_require = typeof require === "function" && require
  return ${loader}
`;
    }