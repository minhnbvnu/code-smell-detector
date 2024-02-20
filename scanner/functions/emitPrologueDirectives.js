function emitPrologueDirectives(statements, sourceFile, seenPrologueDirectives, recordBundleFileSection) {
                let needsToSetSourceFile = !!sourceFile;
                for (let i = 0; i < statements.length; i++) {
                    const statement = statements[i];
                    if (isPrologueDirective(statement)) {
                        const shouldEmitPrologueDirective = seenPrologueDirectives ? !seenPrologueDirectives.has(statement.expression.text) : true;
                        if (shouldEmitPrologueDirective) {
                            if (needsToSetSourceFile) {
                                needsToSetSourceFile = false;
                                setSourceFile(sourceFile);
                            }
                            writeLine();
                            const pos = writer.getTextPos();
                            emit(statement);
                            if (recordBundleFileSection && bundleFileInfo)
                                bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "prologue" /* Prologue */, data: statement.expression.text });
                            if (seenPrologueDirectives) {
                                seenPrologueDirectives.add(statement.expression.text);
                            }
                        }
                    }
                    else {
                        return i;
                    }
                }
                return statements.length;
            }