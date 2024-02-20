function parse$b(template, options = {}) {
    const parser = new Parser$1(template, options);
    if (parser.css.length > 1) {
      parser.error(parser_errors.duplicate_style, parser.css[1].start);
    }
    const instance_scripts = parser.js.filter((script) => script.context === "default");
    const module_scripts = parser.js.filter((script) => script.context === "module");
    if (instance_scripts.length > 1) {
      parser.error(parser_errors.invalid_script_instance, instance_scripts[1].start);
    }
    if (module_scripts.length > 1) {
      parser.error(parser_errors.invalid_script_module, module_scripts[1].start);
    }
    return {
      html: parser.html,
      css: parser.css[0],
      instance: instance_scripts[0],
      module: module_scripts[0]
    };
  }