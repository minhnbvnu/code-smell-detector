function createJSDocPrePostfixUnaryTypeWorker(kind, type, postfix = false) {
                const node = createJSDocUnaryTypeWorker(kind, postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type);
                node.postfix = postfix;
                return node;
            }