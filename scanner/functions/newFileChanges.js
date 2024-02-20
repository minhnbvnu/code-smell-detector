function newFileChanges(oldFile, fileName, statements, newLineCharacter, formatContext) {
                        const text = newFileChangesWorker(oldFile, getScriptKindFromFileName(fileName), statements, newLineCharacter, formatContext);
                        return { fileName, textChanges: [createTextChange(createTextSpan(0, 0), text)], isNewFile: true };
                    }