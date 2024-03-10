function _ansispan(str) {
        var ansi_re = /\x1b\[(.*?)([@-~])/g;
        var fg = [];
        var bg = [];
        var bold = false;
        var underline = false;
        var inverse = false;
        var match;
        var out = [];
        var numbers = [];
        var start = 0;

        str += "\x1b[m";  // Ensure markup for trailing text
        while ((match = ansi_re.exec(str))) {
            if (match[2] === "m") {
                var items = match[1].split(";");
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item === "") {
                        numbers.push(0);
                    } else if (item.search(/^\d+$/) !== -1) {
                        numbers.push(parseInt(item));
                    } else {
                        // Ignored: Invalid color specification
                        numbers.length = 0;
                        break;
                    }
                }
            } else {
                // Ignored: Not a color code
            }
            var chunk = str.substring(start, match.index);
	    _pushColoredChunk(chunk, fg, bg, bold, underline, inverse, out);
            start = ansi_re.lastIndex;

            while (numbers.length) {
                var n = numbers.shift();
                switch (n) {
                    case 0:
                        fg = bg = [];
                        bold = false;
                        underline = false;
                        inverse = false;
                        break;
                    case 1:
                    case 5:
                        bold = true;
                        break;
                    case 4:
                        underline = true;
                        break;
                    case 7:
                        inverse = true;
                        break;
                    case 21:
                    case 22:
                        bold = false;
                        break;
                    case 24:
                        underline = false;
                        break;
                    case 27:
                        inverse = false;
                        break;
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                        fg = n - 30;
                        break;
                    case 38:
                        try {
                            fg = _getExtendedColors(numbers);
                        } catch(e) {
                            numbers.length = 0;
                        }
                        break;
                    case 39:
                        fg = [];
                        break;
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                    case 45:
                    case 46:
                    case 47:
                        bg = n - 40;
                        break;
                    case 48:
                        try {
                            bg = _getExtendedColors(numbers);
                        } catch(e) {
                            numbers.length = 0;
                        }
                        break;
                    case 49:
                        bg = [];
                        break;
		    case 90:
		    case 91:
		    case 92:
		    case 93:
		    case 94:
		    case 95:
		    case 96:
		    case 97:
			fg = n - 90 + 8;
                        break;
		    case 100:
		    case 101:
		    case 102:
		    case 103:
		    case 104:
		    case 105:
		    case 106:
		    case 107:
			bg = n - 100 + 8;
                        break;
                    default:
                        // Unknown codes are ignored
                }
            }
        }
        return out.join("");
    }