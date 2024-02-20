function emptyNavigationBarNode(node, name) {
            return {
                node,
                name: name || (isDeclaration(node) || isExpression(node) ? getNameOfDeclaration(node) : void 0),
                additionalNodes: void 0,
                parent,
                children: void 0,
                indent: parent.indent + 1
            };
        }