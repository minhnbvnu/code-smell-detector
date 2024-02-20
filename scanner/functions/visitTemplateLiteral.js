function visitTemplateLiteral(node) {
                return setTextRange(factory2.createStringLiteral(node.text), node);
            }