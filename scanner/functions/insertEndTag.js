function insertEndTag(cm, indent, pos, tagName) {
		if (shouldIndent(cm, indent, tagName)) {
			cm.replaceSelection('\n\n</' + tagName + '>', 'end');
			cm.indentLine(pos.line + 1);
			cm.indentLine(pos.line + 2);
			cm.setCursor({line: pos.line + 1, ch: cm.getLine(pos.line + 1).length});
		} else {
			cm.replaceSelection('</' + tagName + '>');
			cm.setCursor(pos);
		}
	}