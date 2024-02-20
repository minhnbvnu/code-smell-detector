async function exportCharStyles(ctx) {
	if (!NodeUtils.getProp(xd.root, PropType.EXPORT_CHAR_STYLES)) { return; }
	let entries = assets.characterStyles.get();
	if (!entries || entries.length === 0) { return; }
	let usedNames = {}, names = [];
	let className = cleanDartName(NodeUtils.getProp(xd.root, PropType.CHAR_STYLES_CLASS_NAME)) ||
		DEFAULT_CHAR_STYLES_CLASS_NAME;
	let str = `import 'package:flutter/material.dart';\n\nclass ${className} {\n`;
	for (let i=0, l=entries.length; i<l; i++) {
		let asset = entries[i], name = cleanIdentifierName(asset.name);
		if (!name) { continue; }
		if (usedNames[name]) {
			ctx.log.warn(`Duplicate character style asset name: ${name}`);
			continue;
		}
		usedNames[name] = true;
		names.push(name);
		let style = getTextStyle(getTextStyleParamList(asset.style, false, ctx));
		if (style) { str += `\tstatic const TextStyle ${name} = const ${style};\n`; }
	}
	str += '\n}';
	str = _formatDart(str, false, ctx, null);
	await project.code.writeFile(`${className}.dart`, str, ctx);
}