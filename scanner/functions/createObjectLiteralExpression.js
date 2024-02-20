function createObjectLiteralExpression(properties, multiLine) {
                const node = createBaseDeclaration(207 /* ObjectLiteralExpression */);
                node.properties = createNodeArray(properties);
                node.multiLine = multiLine;
                node.transformFlags |= propagateChildrenFlags(node.properties);
                node.jsDoc = void 0;
                return node;
            }