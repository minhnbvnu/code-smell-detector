function getNameTypeFromMappedType(type) {
                return type.declaration.nameType ? type.nameType || (type.nameType = instantiateType(getTypeFromTypeNode(type.declaration.nameType), type.mapper)) : void 0;
            }