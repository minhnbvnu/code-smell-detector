function getNodes2(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            const heritageClauses = getContainingClass(token).heritageClauses;
            const extendsToken = heritageClauses[0].getFirstToken();
            return extendsToken.kind === 94 /* ExtendsKeyword */ ? { extendsToken, heritageClauses } : void 0;
        }