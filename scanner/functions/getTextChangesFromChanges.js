function getTextChangesFromChanges(changes, newLineCharacter, formatContext, validate) {
                        return mapDefined(group(changes, (c) => c.sourceFile.path), (changesInFile) => {
                            const sourceFile = changesInFile[0].sourceFile;
                            const normalized = stableSort(changesInFile, (a, b) => a.range.pos - b.range.pos || a.range.end - b.range.end);
                            for (let i = 0; i < normalized.length - 1; i++) {
                                Debug.assert(normalized[i].range.end <= normalized[i + 1].range.pos, "Changes overlap", () => `${JSON.stringify(normalized[i].range)} and ${JSON.stringify(normalized[i + 1].range)}`);
                            }
                            const textChanges2 = mapDefined(normalized, (c) => {
                                const span = createTextSpanFromRange(c.range);
                                const newText = computeNewText(c, sourceFile, newLineCharacter, formatContext, validate);
                                if (span.length === newText.length && stringContainsAt(sourceFile.text, newText, span.start)) {
                                    return void 0;
                                }
                                return createTextChange(span, newText);
                            });
                            return textChanges2.length > 0 ? { fileName: sourceFile.fileName, textChanges: textChanges2 } : void 0;
                        });
                    }