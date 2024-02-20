function* generateJsxAttributes(node) {
                if (!length(node.properties))
                    return;
                for (const prop of node.properties) {
                    if (isJsxSpreadAttribute(prop) || isHyphenatedJsxName(idText(prop.name)))
                        continue;
                    yield { errorNode: prop.name, innerExpression: prop.initializer, nameType: getStringLiteralType(idText(prop.name)) };
                }
            }