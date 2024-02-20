function getStartLineAndCharacterForNode(n, sourceFile) {
                        return sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
                    }