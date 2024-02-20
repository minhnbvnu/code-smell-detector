function isStringType(node) {
                const objectType = typeChecker.getTypeAtLocation(service.esTreeNodeToTSNodeMap.get(node));
                return (0, util_1.getTypeName)(typeChecker, objectType) === 'string';
            }