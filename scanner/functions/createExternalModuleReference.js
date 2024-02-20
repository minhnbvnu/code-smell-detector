function createExternalModuleReference(expression) {
                const node = createBaseNode(280 /* ExternalModuleReference */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }