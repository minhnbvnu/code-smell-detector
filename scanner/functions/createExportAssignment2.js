function createExportAssignment2(modifiers, isExportEquals, expression) {
                const node = createBaseDeclaration(274 /* ExportAssignment */);
                node.modifiers = asNodeArray(modifiers);
                node.isExportEquals = isExportEquals;
                node.expression = isExportEquals ? parenthesizerRules().parenthesizeRightSideOfBinary(63 /* EqualsToken */, 
                /*leftSide*/
                void 0, expression) : parenthesizerRules().parenthesizeExpressionOfExportDefault(expression);
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.expression);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }