function isStaticString(node) {
                return isStringLiteral(node) ||
                    isStaticTemplateLiteral(node) ||
                    isStringRawTaggedStaticTemplateLiteral(node);
            }