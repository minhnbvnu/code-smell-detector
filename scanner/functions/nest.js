function nest(str, refs, escape) {
                    const res = [];
                    let match;

                    let a = 0;
                    while (match = re.exec(str)) {
                        if (a++ > 10e3) throw Error('Circular references in parenthesis');

                        res.push(str.slice(0, match.index));

                        res.push(nest(refs[match[1]], refs));

                        str = str.slice(match.index + match[0].length);
                    }

                    res.push(str);

                    return res;
                }