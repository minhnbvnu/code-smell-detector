function getTypeForThisExpressionFromJSDoc(node) {
                const jsdocType = getJSDocType(node);
                if (jsdocType && jsdocType.kind === 320 /* JSDocFunctionType */) {
                    const jsDocFunctionType = jsdocType;
                    if (jsDocFunctionType.parameters.length > 0 && jsDocFunctionType.parameters[0].name && jsDocFunctionType.parameters[0].name.escapedText === "this" /* This */) {
                        return getTypeFromTypeNode(jsDocFunctionType.parameters[0].type);
                    }
                }
                const thisTag = getJSDocThisTag(node);
                if (thisTag && thisTag.typeExpression) {
                    return getTypeFromTypeNode(thisTag.typeExpression);
                }
            }