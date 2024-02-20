function getChildListThatStartsWithOpenerToken(parent2, openerToken, sourceFile) {
            const children = parent2.getChildren(sourceFile);
            const indexOfOpenerToken = children.indexOf(openerToken);
            Debug.assert(indexOfOpenerToken >= 0 && children.length > indexOfOpenerToken + 1);
            return children[indexOfOpenerToken + 1];
        }