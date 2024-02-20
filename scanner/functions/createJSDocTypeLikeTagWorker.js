function createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment) {
                const node = createBaseJSDocTag(kind, tagName != null ? tagName : createIdentifier(getDefaultTagNameForKind(kind)), comment);
                node.typeExpression = typeExpression;
                return node;
            }