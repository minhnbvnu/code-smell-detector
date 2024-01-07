function require(name) {
    var module = require.modules[name];
    if (!module) throw new Error('failed to require "' + name + '"');

    if (!('exports' in module) && typeof module.definition === 'function') {
      module.client = module.component = true;
      module.definition.call(this, module.exports = {}, module);
      delete module.definition;
    }

    return module.exports;
  }