function createShorthandPropertyAssignment(name, objectAssignmentInitializer) {
                const node = createBaseDeclaration(300 /* ShorthandPropertyAssignment */);
                node.name = asName(name);
                node.objectAssignmentInitializer = objectAssignmentInitializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer);
                node.transformFlags |= propagateIdentifierNameFlags(node.name) | propagateChildFlags(node.objectAssignmentInitializer) | 1024 /* ContainsES2015 */;
                node.equalsToken = void 0;
                node.modifiers = void 0;
                node.questionToken = void 0;
                node.exclamationToken = void 0;
                node.jsDoc = void 0;
                return node;
            }