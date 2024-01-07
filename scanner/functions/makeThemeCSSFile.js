function makeThemeCSSFile(cssProperties) {
	var css = `
/* This is a generated file. */
:root {
`;
	for (var k in cssProperties) {
		css += `\t${k}: ${cssProperties[k]};\n`;
	}
	css += `}
`;
	return css;
}