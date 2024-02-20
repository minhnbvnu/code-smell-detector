function isNewGroup(sourceFile, topLevelImportDecl, scanner2) {
            const startPos = topLevelImportDecl.getFullStart();
            const endPos = topLevelImportDecl.getStart();
            scanner2.setText(sourceFile.text, startPos, endPos - startPos);
            let numberOfNewLines = 0;
            while (scanner2.getTokenPos() < endPos) {
                const tokenKind = scanner2.scan();
                if (tokenKind === 4 /* NewLineTrivia */) {
                    numberOfNewLines++;
                    if (numberOfNewLines >= 2) {
                        return true;
                    }
                }
            }
            return false;
        }