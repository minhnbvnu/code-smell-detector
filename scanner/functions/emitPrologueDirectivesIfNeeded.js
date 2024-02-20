function emitPrologueDirectivesIfNeeded(sourceFileOrBundle) {
                if (isSourceFile(sourceFileOrBundle)) {
                    emitPrologueDirectives(sourceFileOrBundle.statements, sourceFileOrBundle);
                }
                else {
                    const seenPrologueDirectives = /* @__PURE__ */ new Set();
                    for (const prepend of sourceFileOrBundle.prepends) {
                        emitUnparsedPrologues(prepend.prologues, seenPrologueDirectives);
                    }
                    for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                        emitPrologueDirectives(sourceFile.statements, sourceFile, seenPrologueDirectives, 
                        /*recordBundleFileSection*/
                        true);
                    }
                    setSourceFile(void 0);
                }
            }