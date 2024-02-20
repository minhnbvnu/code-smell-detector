function createObjectBindingPattern(elements) {
                const node = createBaseNode(203 /* ObjectBindingPattern */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements) | 1024 /* ContainsES2015 */ | 524288 /* ContainsBindingPattern */;
                if (node.transformFlags & 32768 /* ContainsRestOrSpread */) {
                    node.transformFlags |= 128 /* ContainsES2018 */ | 65536 /* ContainsObjectRestOrSpread */;
                }
                return node;
            }