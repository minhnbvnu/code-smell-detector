function createJsxSelfClosingElement(tagName, typeArguments, attributes) {
                const node = createBaseNode(282 /* JsxSelfClosingElement */);
                node.tagName = tagName;
                node.typeArguments = asNodeArray(typeArguments);
                node.attributes = attributes;
                node.transformFlags |= propagateChildFlags(node.tagName) | propagateChildrenFlags(node.typeArguments) | propagateChildFlags(node.attributes) | 2 /* ContainsJsx */;
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                return node;
            }