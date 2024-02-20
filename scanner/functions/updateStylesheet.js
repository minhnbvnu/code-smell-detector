function updateStylesheet() {
	let style = '';
	for ( let prop in stylesheet ) {
		const value = stylesheet[ prop ];
		if ( value === originalStyles[ prop ] ) continue;
		style += `\t${prop}: ${value};\n`;
	}
	if ( style ) {
		style = '.lil-gui {\n' + style + '}';
		customDisplay.innerHTML = style;
		customStyleTag.innerHTML = style;
	} else {
		customDisplay.innerHTML = '';
		customStyleTag.innerHTML = '';
	}
}