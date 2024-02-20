function getPrologueDirectivesFromBundledSourceFiles(bundle) {
                const seenPrologueDirectives = /* @__PURE__ */ new Set();
                let prologues;
                for (let index = 0; index < bundle.sourceFiles.length; index++) {
                    const sourceFile = bundle.sourceFiles[index];
                    let directives;
                    let end = 0;
                    for (const statement of sourceFile.statements) {
                        if (!isPrologueDirective(statement))
                            break;
                        if (seenPrologueDirectives.has(statement.expression.text))
                            continue;
                        seenPrologueDirectives.add(statement.expression.text);
                        (directives || (directives = [])).push({
                            pos: statement.pos,
                            end: statement.end,
                            expression: {
                                pos: statement.expression.pos,
                                end: statement.expression.end,
                                text: statement.expression.text
                            }
                        });
                        end = end < statement.end ? statement.end : end;
                    }
                    if (directives)
                        (prologues || (prologues = [])).push({ file: index, text: sourceFile.text.substring(0, end), directives });
                }
                return prologues;
            }