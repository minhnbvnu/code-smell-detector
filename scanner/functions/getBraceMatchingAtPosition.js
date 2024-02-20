function getBraceMatchingAtPosition(fileName, position) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const token = getTouchingToken(sourceFile, position);
                const matchKind = token.getStart(sourceFile) === position ? braceMatching.get(token.kind.toString()) : void 0;
                const match = matchKind && findChildOfKind(token.parent, matchKind, sourceFile);
                return match ? [createTextSpanFromNode(token, sourceFile), createTextSpanFromNode(match, sourceFile)].sort((a, b) => a.start - b.start) : emptyArray;
            }