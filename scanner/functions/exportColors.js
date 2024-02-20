async function exportColors(ctx) {
	if (!NodeUtils.getProp(xd.root, PropType.EXPORT_COLORS)) { return; }
	let entries = assets.colors.get();
	if (!entries) { return; }
	let lists = {}, usedNames = {}, names = [];
	let className = cleanDartName(NodeUtils.getProp(xd.root, PropType.COLORS_CLASS_NAME)) || 
		DEFAULT_COLORS_CLASS_NAME;
	
	let str = `import 'package:flutter/material.dart';\n\nclass ${className} {\n`;
	for (let i=0, l=entries.length; i<l; i++) {
		let asset = entries[i], name = cleanIdentifierName(asset.name);
		if (!name) { continue; }
		if (usedNames[name]) {
			ctx.log.warn(`Duplicate color asset name: ${name}`);
			continue;
		}
		usedNames[name] = true;
		names.push(name);
		let isGradient = !asset.color;
		let match = /(.+?)(\d+)$/.exec(name);
		if (match) {
			let o = lists[match[1]];
			if (!o) {
				o = lists[match[1]] = [];
				o.isGradient = isGradient;
			}
			if (o.isGradient !== isGradient) {
				ctx.log.warn(`Color asset lists can't mix colors and gradients (${match[1]})`);
			} else {
				o[parseInt(match[2])] = name;
			}
		}
		if (isGradient) {
			let type = ExportUtils.getGradientTypeFromAsset(asset);
			str += `\tstatic const ${type} ${name} = ${ExportUtils.getGradientFromAsset(asset)};\n`;
		} else {
			str += `\tstatic const Color ${name} = ${ExportUtils.getColor(asset.color)};\n`;
		}
	}
	str += '\n';
	for (let n in lists) {
		let s = _getColorList(lists[n], n, true);
		if (s) { str += `${s}\n`; }
	}
	str += '\n}';
	str = _formatDart(str, false, ctx, null);
	await project.code.writeFile(`${className}.dart`, str, ctx);
}