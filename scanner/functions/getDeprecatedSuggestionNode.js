function getDeprecatedSuggestionNode(node) {
                node = skipParentheses(node);
                switch (node.kind) {
                    case 210 /* CallExpression */:
                    case 167 /* Decorator */:
                    case 211 /* NewExpression */:
                        return getDeprecatedSuggestionNode(node.expression);
                    case 212 /* TaggedTemplateExpression */:
                        return getDeprecatedSuggestionNode(node.tag);
                    case 283 /* JsxOpeningElement */:
                    case 282 /* JsxSelfClosingElement */:
                        return getDeprecatedSuggestionNode(node.tagName);
                    case 209 /* ElementAccessExpression */:
                        return node.argumentExpression;
                    case 208 /* PropertyAccessExpression */:
                        return node.name;
                    case 180 /* TypeReference */:
                        const typeReference = node;
                        return isQualifiedName(typeReference.typeName) ? typeReference.typeName.right : typeReference;
                    default:
                        return node;
                }
            }