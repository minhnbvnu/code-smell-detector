function insertCodeThemeCss(_ref) {
  var codeTheme = _ref.codeTheme;

  if (!codeTheme) {
    return;
  } // if (!availableCodeThemes.includes(codeTheme)) {


  if (!availableCodeThemes[codeTheme]) {
    codeTheme = 'github';
    console.warn("\nstorybook-readme: code theme \"".concat(codeTheme, "\" is not available.\n\nNOTE: in 5.0.2 changed highlight library to PrismJS so code theme also changed.  \nAvailable themes:: ").concat(Object.keys(availableCodeThemes).join(', '), ".\nhttps://github.com/PrismJS/prism-themes\n\n"));
  }

  insert({
    styles: availableCodeThemes[codeTheme]
  }); // import(`./prismCodeThemes/${codeTheme}.css.js`).then(t => {
  //   insert({
  //     styles: t.default,
  //   });
  // });
}