function findPrecedingToken(position, sourceFile, startNode2, excludeJsdoc) {
            const result = find2(startNode2 || sourceFile);
            Debug.assert(!(result && isWhiteSpaceOnlyJsxText(result)));
            return result;
            function find2(n) {
                if (isNonWhitespaceToken(n) && n.kind !== 1 /* EndOfFileToken */) {
                    return n;
                }
                const children = n.getChildren(sourceFile);
                const i = binarySearchKey(children, position, (_, i2) => i2, (middle, _) => {
                    if (position < children[middle].end) {
                        if (!children[middle - 1] || position >= children[middle - 1].end) {
                            return 0 /* EqualTo */;
                        }
                        return 1 /* GreaterThan */;
                    }
                    return -1 /* LessThan */;
                });
                if (i >= 0 && children[i]) {
                    const child = children[i];
                    if (position < child.end) {
                        const start = child.getStart(sourceFile, 
                        /*includeJsDoc*/
                        !excludeJsdoc);
                        const lookInPreviousChild = start >= position || // cursor in the leading trivia
                            !nodeHasTokens(child, sourceFile) || isWhiteSpaceOnlyJsxText(child);
                        if (lookInPreviousChild) {
                            const candidate2 = findRightmostChildNodeWithTokens(children, 
                            /*exclusiveStartPosition*/
                            i, sourceFile, n.kind);
                            return candidate2 && findRightmostToken(candidate2, sourceFile);
                        }
                        else {
                            return find2(child);
                        }
                    }
                }
                Debug.assert(startNode2 !== void 0 || n.kind === 308 /* SourceFile */ || n.kind === 1 /* EndOfFileToken */ || isJSDocCommentContainingNode(n));
                const candidate = findRightmostChildNodeWithTokens(children, 
                /*exclusiveStartPosition*/
                children.length, sourceFile, n.kind);
                return candidate && findRightmostToken(candidate, sourceFile);
            }
        }