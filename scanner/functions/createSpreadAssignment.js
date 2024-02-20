function createSpreadAssignment(expression) {
                const node = createBaseDeclaration(301 /* SpreadAssignment */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 128 /* ContainsES2018 */ | 65536 /* ContainsObjectRestOrSpread */;
                node.jsDoc = void 0;
                return node;
            }