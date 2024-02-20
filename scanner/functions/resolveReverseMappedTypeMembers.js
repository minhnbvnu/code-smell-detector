function resolveReverseMappedTypeMembers(type) {
                const indexInfo = getIndexInfoOfType(type.source, stringType);
                const modifiers = getMappedTypeModifiers(type.mappedType);
                const readonlyMask = modifiers & 1 /* IncludeReadonly */ ? false : true;
                const optionalMask = modifiers & 4 /* IncludeOptional */ ? 0 : 16777216 /* Optional */;
                const indexInfos = indexInfo ? [createIndexInfo(stringType, inferReverseMappedType(indexInfo.type, type.mappedType, type.constraintType), readonlyMask && indexInfo.isReadonly)] : emptyArray;
                const members = createSymbolTable();
                for (const prop of getPropertiesOfType(type.source)) {
                    const checkFlags = 8192 /* ReverseMapped */ | (readonlyMask && isReadonlySymbol(prop) ? 8 /* Readonly */ : 0);
                    const inferredProp = createSymbol(4 /* Property */ | prop.flags & optionalMask, prop.escapedName, checkFlags);
                    inferredProp.declarations = prop.declarations;
                    inferredProp.links.nameType = getSymbolLinks(prop).nameType;
                    inferredProp.links.propertyType = getTypeOfSymbol(prop);
                    if (type.constraintType.type.flags & 8388608 /* IndexedAccess */ && type.constraintType.type.objectType.flags & 262144 /* TypeParameter */ && type.constraintType.type.indexType.flags & 262144 /* TypeParameter */) {
                        const newTypeParam = type.constraintType.type.objectType;
                        const newMappedType = replaceIndexedAccess(type.mappedType, type.constraintType.type, newTypeParam);
                        inferredProp.links.mappedType = newMappedType;
                        inferredProp.links.constraintType = getIndexType(newTypeParam);
                    }
                    else {
                        inferredProp.links.mappedType = type.mappedType;
                        inferredProp.links.constraintType = type.constraintType;
                    }
                    members.set(prop.escapedName, inferredProp);
                }
                setStructuredTypeMembers(type, members, emptyArray, emptyArray, indexInfos);
            }