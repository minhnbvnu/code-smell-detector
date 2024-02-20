function prelude() {
        return `\
${comment(license)}
(function(root, factory) {
  const bokeh = factory();
  bokeh.__bokeh__ = true;
  if (typeof root.Bokeh === "undefined" || typeof root.Bokeh.__bokeh__ === "undefined") {
    root.Bokeh = bokeh;
  }
  const Bokeh = root.Bokeh;
  Bokeh[bokeh.version] = bokeh;
})(this, function() {
  let define;
  const parent_require = typeof require === "function" && require
  return ${loader}\
`;
    }