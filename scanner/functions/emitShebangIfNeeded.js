function emitShebangIfNeeded(sourceFileOrBundle) {
                if (isSourceFile(sourceFileOrBundle) || isUnparsedSource(sourceFileOrBundle)) {
                    const shebang = getShebang(sourceFileOrBundle.text);
                    if (shebang) {
                        writeComment(shebang);
                        writeLine();
                        return true;
                    }
                }
                else {
                    for (const prepend of sourceFileOrBundle.prepends) {
                        Debug.assertNode(prepend, isUnparsedSource);
                        if (emitShebangIfNeeded(prepend)) {
                            return true;
                        }
                    }
                    for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                        if (emitShebangIfNeeded(sourceFile)) {
                            return true;
                        }
                    }
                }
            }