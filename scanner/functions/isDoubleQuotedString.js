function isDoubleQuotedString(node) {
                return isStringLiteral(node) && isStringDoubleQuoted(node, sourceFile);
            }