function isCommentAtParentEnd(token, nodeType) {
                const parent = getParentNodeOfToken(token);
                return (!!parent &&
                    isParentNodeType(parent, nodeType) &&
                    parent.loc.end.line - token.loc.end.line === 1);
            }