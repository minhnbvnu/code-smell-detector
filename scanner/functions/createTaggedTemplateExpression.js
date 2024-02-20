function createTaggedTemplateExpression(tag, typeArguments, template) {
                const node = createBaseNode(212 /* TaggedTemplateExpression */);
                node.tag = parenthesizerRules().parenthesizeLeftSideOfAccess(tag, 
                /*optionalChain*/
                false);
                node.typeArguments = asNodeArray(typeArguments);
                node.template = template;
                node.transformFlags |= propagateChildFlags(node.tag) | propagateChildrenFlags(node.typeArguments) | propagateChildFlags(node.template) | 1024 /* ContainsES2015 */;
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                if (hasInvalidEscape(node.template)) {
                    node.transformFlags |= 128 /* ContainsES2018 */;
                }
                return node;
            }