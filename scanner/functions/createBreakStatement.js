function createBreakStatement(label) {
                const node = createBaseNode(249 /* BreakStatement */);
                node.label = asName(label);
                node.transformFlags |= propagateChildFlags(node.label) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }