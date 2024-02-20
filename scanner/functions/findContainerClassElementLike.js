function findContainerClassElementLike(sourceFile, pos) {
            const token = getTokenAtPosition(sourceFile, pos);
            const classElement = findAncestor(token, (node) => {
                if (isClassLike(node))
                    return "quit";
                return isClassElementLikeHasJSDoc(node);
            });
            Debug.assert(classElement && isClassElementLikeHasJSDoc(classElement));
            return classElement;
        }