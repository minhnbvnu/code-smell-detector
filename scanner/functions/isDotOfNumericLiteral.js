function isDotOfNumericLiteral(contextToken2) {
                if (contextToken2.kind === 8 /* NumericLiteral */) {
                    const text = contextToken2.getFullText();
                    return text.charAt(text.length - 1) === ".";
                }
                return false;
            }