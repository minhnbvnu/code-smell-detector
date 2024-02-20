function getSignatureOfTypeTag(node) {
                if (!(isInJSFile(node) && isFunctionLikeDeclaration(node)))
                    return void 0;
                const typeTag = getJSDocTypeTag(node);
                return (typeTag == null ? void 0 : typeTag.typeExpression) && getSingleCallSignature(getTypeFromTypeNode(typeTag.typeExpression));
            }