function isTopLevelJSDoc(node) {
            const containingJSDoc = findAncestor(node, isJSDocNode);
            if (containingJSDoc) {
                const containingNonJSDoc = findAncestor(containingJSDoc, (n) => !isJSDocNode(n));
                return !!containingNonJSDoc && isFunctionLikeDeclaration(containingNonJSDoc);
            }
            return false;
        }