function mergeReferences(program, ...referencesToMerge) {
                        let result;
                        for (const references of referencesToMerge) {
                            if (!references || !references.length)
                                continue;
                            if (!result) {
                                result = references;
                                continue;
                            }
                            for (const entry of references) {
                                if (!entry.definition || entry.definition.type !== 0 /* Symbol */) {
                                    result.push(entry);
                                    continue;
                                }
                                const symbol = entry.definition.symbol;
                                const refIndex = findIndex(result, (ref) => !!ref.definition && ref.definition.type === 0 /* Symbol */ && ref.definition.symbol === symbol);
                                if (refIndex === -1) {
                                    result.push(entry);
                                    continue;
                                }
                                const reference = result[refIndex];
                                result[refIndex] = {
                                    definition: reference.definition,
                                    references: reference.references.concat(entry.references).sort((entry1, entry2) => {
                                        const entry1File = getSourceFileIndexOfEntry(program, entry1);
                                        const entry2File = getSourceFileIndexOfEntry(program, entry2);
                                        if (entry1File !== entry2File) {
                                            return compareValues(entry1File, entry2File);
                                        }
                                        const entry1Span = getTextSpanOfEntry(entry1);
                                        const entry2Span = getTextSpanOfEntry(entry2);
                                        return entry1Span.start !== entry2Span.start ? compareValues(entry1Span.start, entry2Span.start) : compareValues(entry1Span.length, entry2Span.length);
                                    })
                                };
                            }
                        }
                        return result;
                    }