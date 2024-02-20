function getInferTypeContainer(node) {
                const extendsType = findAncestor(node, (n) => n.parent && isConditionalTypeNode(n.parent) && n.parent.extendsType === n);
                return extendsType && extendsType.parent;
            }