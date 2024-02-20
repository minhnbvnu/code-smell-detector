function getObjectLiteralIndexInfo(node, offset, properties, keyType) {
                const propTypes = [];
                for (let i = offset; i < properties.length; i++) {
                    const prop = properties[i];
                    if (keyType === stringType && !isSymbolWithSymbolName(prop) || keyType === numberType && isSymbolWithNumericName(prop) || keyType === esSymbolType && isSymbolWithSymbolName(prop)) {
                        propTypes.push(getTypeOfSymbol(properties[i]));
                    }
                }
                const unionType = propTypes.length ? getUnionType(propTypes, 2 /* Subtype */) : undefinedType;
                return createIndexInfo(keyType, unionType, isConstContext(node));
            }