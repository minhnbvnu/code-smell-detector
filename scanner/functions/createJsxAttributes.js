function createJsxAttributes(properties) {
                const node = createBaseDeclaration(289 /* JsxAttributes */);
                node.properties = createNodeArray(properties);
                node.transformFlags |= propagateChildrenFlags(node.properties) | 2 /* ContainsJsx */;
                return node;
            }