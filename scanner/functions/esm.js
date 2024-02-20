function esm(program, name2, banner, sveltePath, internal_path, helpers, globals2, imports, module_exports, exports_from) {
    const import_declaration = {
      type: "ImportDeclaration",
      specifiers: helpers.map((h2) => ({
        type: "ImportSpecifier",
        local: h2.alias,
        imported: { type: "Identifier", name: h2.name }
      })),
      source: { type: "Literal", value: internal_path }
    };
    const internal_globals = get_internal_globals(globals2, helpers);
    function rewrite_import(node2) {
      const value = edit_source(node2.source.value, sveltePath);
      if (node2.source.value !== value) {
        node2.source.value = value;
        node2.source.raw = null;
      }
    }
    imports.forEach(rewrite_import);
    exports_from.forEach(rewrite_import);
    const exports = module_exports.length > 0 && {
      type: "ExportNamedDeclaration",
      specifiers: module_exports.map((x2) => ({
        type: "Specifier",
        local: { type: "Identifier", name: x2.name },
        exported: { type: "Identifier", name: x2.as }
      }))
    };
    program.body = b`
		/* ${banner} */

		${import_declaration}
		${internal_globals}
		${imports}
		${exports_from}

		${program.body}

		export default ${name2};
		${exports}
	`;
  }