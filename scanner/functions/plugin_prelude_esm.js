function plugin_prelude_esm() {
        return `\
${comment(license)}
import main from "./bokeh.esm.js";

const plugin = (function(modules, entry, aliases, externals) {
  main.register_plugin(modules, entry, aliases);
})\
`;
    }