function getIndexInfosAtLocation(node) {
                if (isIdentifier(node) && isPropertyAccessExpression(node.parent) && node.parent.name === node) {
                    const keyType = getLiteralTypeFromPropertyName(node);
                    const objectType = getTypeOfExpression(node.parent.expression);
                    const objectTypes = objectType.flags & 1048576 /* Union */ ? objectType.types : [objectType];
                    return flatMap(objectTypes, (t) => filter(getIndexInfosOfType(t), (info) => isApplicableIndexType(keyType, info.keyType)));
                }
                return void 0;
            }