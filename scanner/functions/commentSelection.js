function commentSelection(fileName, textRange) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const { firstLine, lastLine } = getLinesForRange(sourceFile, textRange);
                return firstLine === lastLine && textRange.pos !== textRange.end ? toggleMultilineComment(fileName, textRange, 
                /*insertComment*/
                true) : toggleLineComment(fileName, textRange, 
                /*insertComment*/
                true);
            }