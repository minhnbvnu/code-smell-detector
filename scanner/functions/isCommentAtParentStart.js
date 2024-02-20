function isCommentAtParentStart(token, nodeType) {
                const parent = getParentNodeOfToken(token);
                if (parent && isParentNodeType(parent, nodeType)) {
                    const parentStartNodeOrToken = parent;
                    return (token.loc.start.line - parentStartNodeOrToken.loc.start.line === 1);
                }
                return false;
            }