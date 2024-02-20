function createJsxAttribute(name, initializer) {
                const node = createBaseDeclaration(288 /* JsxAttribute */);
                node.name = name;
                node.initializer = initializer;
                node.transformFlags |= propagateChildFlags(node.name) | propagateChildFlags(node.initializer) | 2 /* ContainsJsx */;
                return node;
            }