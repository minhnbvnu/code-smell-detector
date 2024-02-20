function createJsxOpeningElement(tagName, typeArguments, attributes) {
                const node = createBaseNode(283 /* JsxOpeningElement */);
                node.tagName = tagName;
                node.typeArguments = asNodeArray(typeArguments);
                node.attributes = attributes;
                node.transformFlags |= propagateChildFlags(node.tagName) | propagateChildrenFlags(node.typeArguments) | propagateChildFlags(node.attributes) | 2 /* ContainsJsx */;
                if (typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                return node;
            }