function createPropertyAssignment(name, initializer) {
                const node = createBaseDeclaration(299 /* PropertyAssignment */);
                node.name = asName(name);
                node.initializer = parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
                node.transformFlags |= propagateNameFlags(node.name) | propagateChildFlags(node.initializer);
                node.modifiers = void 0;
                node.questionToken = void 0;
                node.exclamationToken = void 0;
                node.jsDoc = void 0;
                return node;
            }