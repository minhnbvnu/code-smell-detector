function findRightmostToken(n, sourceFile) {
            if (isNonWhitespaceToken(n)) {
                return n;
            }
            const children = n.getChildren(sourceFile);
            if (children.length === 0) {
                return n;
            }
            const candidate = findRightmostChildNodeWithTokens(children, 
            /*exclusiveStartPosition*/
            children.length, sourceFile, n.kind);
            return candidate && findRightmostToken(candidate, sourceFile);
        }