function attachModuleSymbols(doclets, modules) {
  const symbols = {};

  // build a lookup table
  doclets.forEach(function (symbol) {
    symbols[symbol.longname] = symbol;
  });

  modules.forEach(function (module) {
    if (symbols[module.longname]) {
      module.module = symbols[module.longname];
      module.module.name =
        module.module.name.replace('module:', 'require("') + '")';
    }
  });
}