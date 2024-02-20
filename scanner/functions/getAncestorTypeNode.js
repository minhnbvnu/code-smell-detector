function getAncestorTypeNode(node) {
            let lastTypeNode;
            findAncestor(node, (a) => {
                if (isTypeNode(a)) {
                    lastTypeNode = a;
                }
                return !isQualifiedName(a.parent) && !isTypeNode(a.parent) && !isTypeElement(a.parent);
            });
            return lastTypeNode;
        }