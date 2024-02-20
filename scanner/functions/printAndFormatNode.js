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