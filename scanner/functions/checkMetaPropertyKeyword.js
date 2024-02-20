function checkMetaPropertyKeyword(node) {
                switch (node.keywordToken) {
                    case 100 /* ImportKeyword */:
                        return getGlobalImportMetaExpressionType();
                    case 103 /* NewKeyword */:
                        const type = checkNewTargetMetaProperty(node);
                        return isErrorType(type) ? errorType : createNewTargetExpressionType(type);
                    default:
                        Debug.assertNever(node.keywordToken);
                }
            }