function updateLanguageServiceSourceFile(sourceFile, scriptSnapshot, version2, textChangeRange, aggressiveChecks) {
            if (textChangeRange) {
                if (version2 !== sourceFile.version) {
                    let newText;
                    const prefix = textChangeRange.span.start !== 0 ? sourceFile.text.substr(0, textChangeRange.span.start) : "";
                    const suffix = textSpanEnd(textChangeRange.span) !== sourceFile.text.length ? sourceFile.text.substr(textSpanEnd(textChangeRange.span)) : "";
                    if (textChangeRange.newLength === 0) {
                        newText = prefix && suffix ? prefix + suffix : prefix || suffix;
                    }
                    else {
                        const changedText = scriptSnapshot.getText(textChangeRange.span.start, textChangeRange.span.start + textChangeRange.newLength);
                        newText = prefix && suffix ? prefix + changedText + suffix : prefix ? prefix + changedText : changedText + suffix;
                    }
                    const newSourceFile = updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
                    setSourceFileFields(newSourceFile, scriptSnapshot, version2);
                    newSourceFile.nameTable = void 0;
                    if (sourceFile !== newSourceFile && sourceFile.scriptSnapshot) {
                        if (sourceFile.scriptSnapshot.dispose) {
                            sourceFile.scriptSnapshot.dispose();
                        }
                        sourceFile.scriptSnapshot = void 0;
                    }
                    return newSourceFile;
                }
            }
            const options = {
                languageVersion: sourceFile.languageVersion,
                impliedNodeFormat: sourceFile.impliedNodeFormat,
                setExternalModuleIndicator: sourceFile.setExternalModuleIndicator
            };
            return createLanguageServiceSourceFile(sourceFile.fileName, scriptSnapshot, options, version2, 
            /*setNodeParents*/
            true, sourceFile.scriptKind);
        }