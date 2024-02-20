function computeNewText(change, sourceFile, newLineCharacter, formatContext, validate) {
                        var _a2;
                        if (change.kind === 0 /* Remove */) {
                            return "";
                        }
                        if (change.kind === 3 /* Text */) {
                            return change.text;
                        }
                        const { options = {}, range: { pos } } = change;
                        const format = (n) => getFormattedTextOfNode(n, sourceFile, pos, options, newLineCharacter, formatContext, validate);
                        const text = change.kind === 2 /* ReplaceWithMultipleNodes */ ? change.nodes.map((n) => removeSuffix(format(n), newLineCharacter)).join(((_a2 = change.options) == null ? void 0 : _a2.joiner) || newLineCharacter) : format(change.node);
                        const noIndent = options.indentation !== void 0 || getLineStartPositionForPosition(pos, sourceFile) === pos ? text : text.replace(/^\s+/, "");
                        return (options.prefix || "") + noIndent + (!options.suffix || endsWith(noIndent, options.suffix) ? "" : options.suffix);
                    }