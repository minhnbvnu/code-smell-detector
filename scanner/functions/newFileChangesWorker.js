function newFileChangesWorker(oldFile, scriptKind, statements, newLineCharacter, formatContext) {
                        const nonFormattedText = statements.map((s) => s === 4 /* NewLineTrivia */ ? "" : getNonformattedText(s, oldFile, newLineCharacter).text).join(newLineCharacter);
                        const sourceFile = createSourceFile("any file name", nonFormattedText, 99 /* ESNext */, 
                        /*setParentNodes*/
                        true, scriptKind);
                        const changes = ts_formatting_exports.formatDocument(sourceFile, formatContext);
                        return applyChanges(nonFormattedText, changes) + newLineCharacter;
                    }