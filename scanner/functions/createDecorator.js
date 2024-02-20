function createDecorator(expression) {
                const node = createBaseNode(167 /* Decorator */);
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false);
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */ | 8192 /* ContainsTypeScriptClassSyntax */ | 33554432 /* ContainsDecorators */;
                return node;
            }