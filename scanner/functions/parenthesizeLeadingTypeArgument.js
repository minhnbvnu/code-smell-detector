function parenthesizeLeadingTypeArgument(node) {
                return isFunctionOrConstructorTypeNode(node) && node.typeParameters ? factory2.createParenthesizedType(node) : node;
            }