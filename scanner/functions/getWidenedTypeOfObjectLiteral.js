function getWidenedTypeOfObjectLiteral(type, context) {
                const members = createSymbolTable();
                for (const prop of getPropertiesOfObjectType(type)) {
                    members.set(prop.escapedName, getWidenedProperty(prop, context));
                }
                if (context) {
                    for (const prop of getPropertiesOfContext(context)) {
                        if (!members.has(prop.escapedName)) {
                            members.set(prop.escapedName, getUndefinedProperty(prop));
                        }
                    }
                }
                const result = createAnonymousType(type.symbol, members, emptyArray, emptyArray, sameMap(getIndexInfosOfType(type), (info) => createIndexInfo(info.keyType, getWidenedType(info.type), info.isReadonly)));
                result.objectFlags |= getObjectFlags(type) & (4096 /* JSLiteral */ | 262144 /* NonInferrableType */);
                return result;
            }