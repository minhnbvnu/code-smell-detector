function findRightmostChildNodeWithTokens(children, exclusiveStartPosition, sourceFile, parentKind) {
            for (let i = exclusiveStartPosition - 1; i >= 0; i--) {
                const child = children[i];
                if (isWhiteSpaceOnlyJsxText(child)) {
                    if (i === 0 && (parentKind === 11 /* JsxText */ || parentKind === 282 /* JsxSelfClosingElement */)) {
                        Debug.fail("`JsxText` tokens should not be the first child of `JsxElement | JsxSelfClosingElement`");
                    }
                }
                else if (nodeHasTokens(children[i], sourceFile)) {
                    return children[i];
                }
            }
        }