function splitBy(string, separator, o) {
                let i;
                if (string == null) throw Error('First argument should be a string');
                if (separator == null) throw Error('Separator should be a string or a RegExp');

                if (!o) o = {};
                else if (typeof o === 'string' || Array.isArray(o)) {
                    o = {ignore: o};
                }

                if (o.escape == null) o.escape = true;
                if (o.ignore == null) o.ignore = ['[]', '()', '{}', '<>', '""', '\'\'', '``', '“”', '«»'];
                else {
                    if (typeof o.ignore === 'string') {
                        o.ignore = [o.ignore];
                    }

                    o.ignore = o.ignore.map(function (pair) {
                        // '"' → '""'
                        if (pair.length === 1) pair = pair + pair;
                        return pair;
                    });
                }

                const tokens = paren.parse(string, {flat: true, brackets: o.ignore});
                const str = tokens[0];

                let parts = str.split(separator);

                // join parts separated by escape
                if (o.escape) {
                    const cleanParts = [];
                    for (i = 0; i < parts.length; i++) {
                        const prev = parts[i];
                        const part = parts[i + 1];

                        if (prev[prev.length - 1] === '\\' && prev[prev.length - 2] !== '\\') {
                            cleanParts.push(prev + separator + part);
                            i++;
                        } else {
                            cleanParts.push(prev);
                        }
                    }
                    parts = cleanParts;
                }

                // open parens pack & apply unquotes, if any
                for (i = 0; i < parts.length; i++) {
                    tokens[0] = parts[i];
                    parts[i] = paren.stringify(tokens, {flat: true});
                }

                return parts;
            }