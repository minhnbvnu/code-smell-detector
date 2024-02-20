function isStringRawTaggedStaticTemplateLiteral(node) {
                return node.type === "TaggedTemplateExpression" &&
                    astUtils.isSpecificMemberAccess(node.tag, "String", "raw") &&
                    isGlobalReference(astUtils.skipChainExpression(node.tag).object) &&
                    isStaticTemplateLiteral(node.quasi);
            }