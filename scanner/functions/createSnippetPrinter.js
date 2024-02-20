function createSnippetPrinter(printerOptions) {
            let escapes;
            const baseWriter = ts_textChanges_exports.createWriter(getNewLineCharacter(printerOptions));
            const printer = createPrinter(printerOptions, baseWriter);
            const writer = {
                ...baseWriter,
                write: (s) => escapingWrite(s, () => baseWriter.write(s)),
                nonEscapingWrite: baseWriter.write,
                writeLiteral: (s) => escapingWrite(s, () => baseWriter.writeLiteral(s)),
                writeStringLiteral: (s) => escapingWrite(s, () => baseWriter.writeStringLiteral(s)),
                writeSymbol: (s, symbol) => escapingWrite(s, () => baseWriter.writeSymbol(s, symbol)),
                writeParameter: (s) => escapingWrite(s, () => baseWriter.writeParameter(s)),
                writeComment: (s) => escapingWrite(s, () => baseWriter.writeComment(s)),
                writeProperty: (s) => escapingWrite(s, () => baseWriter.writeProperty(s))
            };
            return {
                printSnippetList,
                printAndFormatSnippetList,
                printNode,
                printAndFormatNode
            };
            function escapingWrite(s, write) {
                const escaped = escapeSnippetText(s);
                if (escaped !== s) {
                    const start = baseWriter.getTextPos();
                    write();
                    const end = baseWriter.getTextPos();
                    escapes = append(escapes || (escapes = []), { newText: escaped, span: { start, length: end - start } });
                }
                else {
                    write();
                }
            }
            function printSnippetList(format, list, sourceFile) {
                const unescaped = printUnescapedSnippetList(format, list, sourceFile);
                return escapes ? ts_textChanges_exports.applyChanges(unescaped, escapes) : unescaped;
            }
            function printUnescapedSnippetList(format, list, sourceFile) {
                escapes = void 0;
                writer.clear();
                printer.writeList(format, list, sourceFile, writer);
                return writer.getText();
            }
            function printAndFormatSnippetList(format, list, sourceFile, formatContext) {
                const syntheticFile = {
                    text: printUnescapedSnippetList(format, list, sourceFile),
                    getLineAndCharacterOfPosition(pos) {
                        return getLineAndCharacterOfPosition(this, pos);
                    }
                };
                const formatOptions = getFormatCodeSettingsForWriting(formatContext, sourceFile);
                const changes = flatMap(list, (node) => {
                    const nodeWithPos = ts_textChanges_exports.assignPositionsToNode(node);
                    return ts_formatting_exports.formatNodeGivenIndentation(nodeWithPos, syntheticFile, sourceFile.languageVariant, 
                    /* indentation */
                    0, 
                    /* delta */
                    0, { ...formatContext, options: formatOptions });
                });
                const allChanges = escapes ? stableSort(concatenate(changes, escapes), (a, b) => compareTextSpans(a.span, b.span)) : changes;
                return ts_textChanges_exports.applyChanges(syntheticFile.text, allChanges);
            }
            function printNode(hint, node, sourceFile) {
                const unescaped = printUnescapedNode(hint, node, sourceFile);
                return escapes ? ts_textChanges_exports.applyChanges(unescaped, escapes) : unescaped;
            }
            function printUnescapedNode(hint, node, sourceFile) {
                escapes = void 0;
                writer.clear();
                printer.writeNode(hint, node, sourceFile, writer);
                return writer.getText();
            }
            function printAndFormatNode(hint, node, sourceFile, formatContext) {
                const syntheticFile = {
                    text: printUnescapedNode(hint, node, sourceFile),
                    getLineAndCharacterOfPosition(pos) {
                        return getLineAndCharacterOfPosition(this, pos);
                    }
                };
                const formatOptions = getFormatCodeSettingsForWriting(formatContext, sourceFile);
                const nodeWithPos = ts_textChanges_exports.assignPositionsToNode(node);
                const changes = ts_formatting_exports.formatNodeGivenIndentation(nodeWithPos, syntheticFile, sourceFile.languageVariant, 
                /* indentation */
                0, 
                /* delta */
                0, { ...formatContext, options: formatOptions });
                const allChanges = escapes ? stableSort(concatenate(changes, escapes), (a, b) => compareTextSpans(a.span, b.span)) : changes;
                return ts_textChanges_exports.applyChanges(syntheticFile.text, allChanges);
            }
        }