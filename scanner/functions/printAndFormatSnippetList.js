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