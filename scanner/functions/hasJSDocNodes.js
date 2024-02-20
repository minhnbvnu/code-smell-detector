function hasJSDocNodes(node) {
            if (!canHaveJSDoc(node))
                return false;
            const { jsDoc } = node;
            return !!jsDoc && jsDoc.length > 0;
        }