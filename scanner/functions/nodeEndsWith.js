function nodeEndsWith(n, expectedLastToken, sourceFile) {
            const children = n.getChildren(sourceFile);
            if (children.length) {
                const lastChild = last(children);
                if (lastChild.kind === expectedLastToken) {
                    return true;
                }
                else if (lastChild.kind === 26 /* SemicolonToken */ && children.length !== 1) {
                    return children[children.length - 2].kind === expectedLastToken;
                }
            }
            return false;
        }