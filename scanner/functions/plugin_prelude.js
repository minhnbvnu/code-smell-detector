function plugin_prelude(options) {
        return `\
${comment(license)}
(function(root, factory) {
  factory(root["Bokeh"], ${str(options?.version)});
})(this, function(Bokeh, version) {
  let define;
  return (function(modules, entry, aliases, externals) {
    const bokeh = typeof Bokeh !== "undefined" && (version != null ? Bokeh[version] : Bokeh);
    if (bokeh != null) {
      return bokeh.register_plugin(modules, entry, aliases);
    } else {
      throw new Error("Cannot find Bokeh " + version + ". You have to load it prior to loading plugins.");
    }
  })
`;
    }