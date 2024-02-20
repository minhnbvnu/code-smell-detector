function doChanges2(changes, sourceFile, extendsToken, heritageClauses) {
            changes.replaceNode(sourceFile, extendsToken, factory.createToken(117 /* ImplementsKeyword */));
            if (heritageClauses.length === 2 && heritageClauses[0].token === 94 /* ExtendsKeyword */ && heritageClauses[1].token === 117 /* ImplementsKeyword */) {
                const implementsToken = heritageClauses[1].getFirstToken();
                const implementsFullStart = implementsToken.getFullStart();
                changes.replaceRange(sourceFile, { pos: implementsFullStart, end: implementsFullStart }, factory.createToken(27 /* CommaToken */));
                const text = sourceFile.text;
                let end = implementsToken.end;
                while (end < text.length && isWhiteSpaceSingleLine(text.charCodeAt(end))) {
                    end++;
                }
                changes.deleteRange(sourceFile, { pos: implementsToken.getStart(), end });
            }
        }