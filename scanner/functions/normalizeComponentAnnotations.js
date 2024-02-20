function normalizeComponentAnnotations(defaultExport) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultExport.title;
  var importPath = arguments.length > 2 ? arguments[2] : undefined;
  var id = defaultExport.id,
      argTypes = defaultExport.argTypes;
  return Object.assign({
    id: Object(_storybook_csf__WEBPACK_IMPORTED_MODULE_1__["sanitize"])(id || title)
  }, defaultExport, {
    title: title
  }, argTypes && {
    argTypes: Object(_normalizeInputTypes__WEBPACK_IMPORTED_MODULE_2__[/* normalizeInputTypes */ "a"])(argTypes)
  }, {
    parameters: Object.assign({
      fileName: importPath
    }, defaultExport.parameters)
  });
}