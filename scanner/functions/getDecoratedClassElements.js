function getDecoratedClassElements(node, isStatic2) {
                return filter(node.members, (m) => isDecoratedClassElement(m, isStatic2, node));
            }