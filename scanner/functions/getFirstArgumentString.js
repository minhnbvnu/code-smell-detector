function getFirstArgumentString(node) {
                if (isStringLiteral(node)) {
                    return node.value.trim();
                }
                if (isStaticTemplateLiteral(node)) {
                    return node.quasis[0].value.cooked.trim();
                }
                return null;
            }