function extractPragmas(pragmas, range, text) {
            const tripleSlash = range.kind === 2 /* SingleLineCommentTrivia */ && tripleSlashXMLCommentStartRegEx.exec(text);
            if (tripleSlash) {
                const name = tripleSlash[1].toLowerCase();
                const pragma = commentPragmas[name];
                if (!pragma || !(pragma.kind & 1 /* TripleSlashXML */)) {
                    return;
                }
                if (pragma.args) {
                    const argument = {};
                    for (const arg of pragma.args) {
                        const matcher = getNamedArgRegEx(arg.name);
                        const matchResult = matcher.exec(text);
                        if (!matchResult && !arg.optional) {
                            return;
                        }
                        else if (matchResult) {
                            const value = matchResult[2] || matchResult[3];
                            if (arg.captureSpan) {
                                const startPos = range.pos + matchResult.index + matchResult[1].length + 1;
                                argument[arg.name] = {
                                    value,
                                    pos: startPos,
                                    end: startPos + value.length
                                };
                            }
                            else {
                                argument[arg.name] = value;
                            }
                        }
                    }
                    pragmas.push({ name, args: { arguments: argument, range } });
                }
                else {
                    pragmas.push({ name, args: { arguments: {}, range } });
                }
                return;
            }
            const singleLine = range.kind === 2 /* SingleLineCommentTrivia */ && singleLinePragmaRegEx.exec(text);
            if (singleLine) {
                return addPragmaForMatch(pragmas, range, 2 /* SingleLine */, singleLine);
            }
            if (range.kind === 3 /* MultiLineCommentTrivia */) {
                const multiLinePragmaRegEx = /@(\S+)(\s+.*)?$/gim;
                let multiLineMatch;
                while (multiLineMatch = multiLinePragmaRegEx.exec(text)) {
                    addPragmaForMatch(pragmas, range, 4 /* MultiLine */, multiLineMatch);
                }
            }
        }