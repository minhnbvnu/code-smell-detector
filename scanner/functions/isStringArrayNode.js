function isStringArrayNode(node) {
                const type = checker.getTypeAtLocation(service.esTreeNodeToTSNodeMap.get(node));
                if (checker.isArrayType(type) || checker.isTupleType(type)) {
                    const typeArgs = checker.getTypeArguments(type);
                    return typeArgs.every(arg => util.getTypeName(checker, arg) === 'string');
                }
                return false;
            }