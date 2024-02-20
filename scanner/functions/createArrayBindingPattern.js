function createArrayBindingPattern(elements) {
                const node = createBaseNode(204 /* ArrayBindingPattern */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements) | 1024 /* ContainsES2015 */ | 524288 /* ContainsBindingPattern */;
                return node;
            }