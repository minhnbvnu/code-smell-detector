function substituteArgs(parser, args, str) {
            var text = '';
            var newstring = '';
            var i = 0;
            while (i < str.length) {
                var c = str.charAt(i++);
                if (c === '\\') {
                    text += c + str.charAt(i++);
                }
                else if (c === '#') {
                    c = str.charAt(i++);
                    if (c === '#') {
                        text += c;
                    }
                    else {
                        if (!c.match(/[1-9]/) || parseInt(c, 10) > args.length) {
                            throw new TexError_js_1.default('IllegalMacroParam', 'Illegal macro parameter reference');
                        }
                        newstring = addArgs(parser, addArgs(parser, newstring, text), args[parseInt(c, 10) - 1]);
                        text = '';
                    }
                }
                else {
                    text += c;
                }
            }
            return addArgs(parser, newstring, text);
        }