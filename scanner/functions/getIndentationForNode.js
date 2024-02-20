function getIndentationForNode(n, ignoreActualIndentationRange, sourceFile, options) {
                        const start = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
                        return getIndentationForNodeWorker(n, start, ignoreActualIndentationRange, 
                        /*indentationDelta*/
                        0, sourceFile, 
                        /*isNextChild*/
                        false, options);
                    }