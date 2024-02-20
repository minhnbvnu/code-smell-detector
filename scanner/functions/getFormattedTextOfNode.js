function getFormattedTextOfNode(nodeIn, sourceFile, pos, { indentation, prefix, delta }, newLineCharacter, formatContext, validate) {
                        const { node, text } = getNonformattedText(nodeIn, sourceFile, newLineCharacter);
                        if (validate)
                            validate(node, text);
                        const formatOptions = getFormatCodeSettingsForWriting(formatContext, sourceFile);
                        const initialIndentation = indentation !== void 0 ? indentation : ts_formatting_exports.SmartIndenter.getIndentation(pos, sourceFile, formatOptions, prefix === newLineCharacter || getLineStartPositionForPosition(pos, sourceFile) === pos);
                        if (delta === void 0) {
                            delta = ts_formatting_exports.SmartIndenter.shouldIndentChildNode(formatOptions, nodeIn) ? formatOptions.indentSize || 0 : 0;
                        }
                        const file = {
                            text,
                            getLineAndCharacterOfPosition(pos2) {
                                return getLineAndCharacterOfPosition(this, pos2);
                            }
                        };
                        const changes = ts_formatting_exports.formatNodeGivenIndentation(node, file, sourceFile.languageVariant, initialIndentation, delta, { ...formatContext, options: formatOptions });
                        return applyChanges(text, changes);
                    }