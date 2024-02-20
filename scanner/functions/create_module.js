function create_module(program, format, name2, banner, sveltePath = "svelte", helpers, globals2, imports, module_exports, exports_from) {
    const internal_path = `${sveltePath}/internal`;
    helpers.sort((a, b2) => a.name < b2.name ? -1 : 1);
    globals2.sort((a, b2) => a.name < b2.name ? -1 : 1);
    const formatter = wrappers$1[format];
    if (!formatter) {
      throw new Error(`options.format is invalid (must be ${list$1(Object.keys(wrappers$1))})`);
    }
    return formatter(program, name2, banner, sveltePath, internal_path, helpers, globals2, imports, module_exports, exports_from);
  }