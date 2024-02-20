function substituteTaggedTemplateExpression(node) {
                if (isIdentifier(node.tag)) {
                    const tag = substituteExpressionIdentifier(node.tag);
                    noSubstitution[getNodeId(tag)] = true;
                    if (!isIdentifier(tag) && !(getEmitFlags(node.tag) & 8192 /* HelperName */)) {
                        return addInternalEmitFlags(factory2.updateTaggedTemplateExpression(node, tag, 
                        /*typeArguments*/
                        void 0, node.template), 16 /* IndirectCall */);
                    }
                }
                return node;
            }