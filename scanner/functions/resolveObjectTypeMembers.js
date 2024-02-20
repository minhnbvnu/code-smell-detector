function resolveObjectTypeMembers(type, source, typeParameters, typeArguments) {
                let mapper;
                let members;
                let callSignatures;
                let constructSignatures;
                let indexInfos;
                if (rangeEquals(typeParameters, typeArguments, 0, typeParameters.length)) {
                    members = source.symbol ? getMembersOfSymbol(source.symbol) : createSymbolTable(source.declaredProperties);
                    callSignatures = source.declaredCallSignatures;
                    constructSignatures = source.declaredConstructSignatures;
                    indexInfos = source.declaredIndexInfos;
                }
                else {
                    mapper = createTypeMapper(typeParameters, typeArguments);
                    members = createInstantiatedSymbolTable(source.declaredProperties, mapper, 
                    /*mappingThisOnly*/
                    typeParameters.length === 1);
                    callSignatures = instantiateSignatures(source.declaredCallSignatures, mapper);
                    constructSignatures = instantiateSignatures(source.declaredConstructSignatures, mapper);
                    indexInfos = instantiateIndexInfos(source.declaredIndexInfos, mapper);
                }
                const baseTypes = getBaseTypes(source);
                if (baseTypes.length) {
                    if (source.symbol && members === getMembersOfSymbol(source.symbol)) {
                        members = createSymbolTable(source.declaredProperties);
                    }
                    setStructuredTypeMembers(type, members, callSignatures, constructSignatures, indexInfos);
                    const thisArgument = lastOrUndefined(typeArguments);
                    for (const baseType of baseTypes) {
                        const instantiatedBaseType = thisArgument ? getTypeWithThisArgument(instantiateType(baseType, mapper), thisArgument) : baseType;
                        addInheritedMembers(members, getPropertiesOfType(instantiatedBaseType));
                        callSignatures = concatenate(callSignatures, getSignaturesOfType(instantiatedBaseType, 0 /* Call */));
                        constructSignatures = concatenate(constructSignatures, getSignaturesOfType(instantiatedBaseType, 1 /* Construct */));
                        const inheritedIndexInfos = instantiatedBaseType !== anyType ? getIndexInfosOfType(instantiatedBaseType) : [createIndexInfo(stringType, anyType, 
                            /*isReadonly*/
                            false)];
                        indexInfos = concatenate(indexInfos, filter(inheritedIndexInfos, (info) => !findIndexInfo(indexInfos, info.keyType)));
                    }
                }
                setStructuredTypeMembers(type, members, callSignatures, constructSignatures, indexInfos);
            }