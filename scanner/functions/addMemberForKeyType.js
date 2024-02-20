function addMemberForKeyType(keyType) {
                    const propNameType = nameType ? instantiateType(nameType, appendTypeMapping(type.mapper, typeParameter, keyType)) : keyType;
                    keyTypes.push(propNameType === stringType ? stringOrNumberType : propNameType);
                }