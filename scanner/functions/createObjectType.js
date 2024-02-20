function createObjectType(objectFlags, symbol) {
                const type = createTypeWithSymbol(524288 /* Object */, symbol);
                type.objectFlags = objectFlags;
                type.members = void 0;
                type.properties = void 0;
                type.callSignatures = void 0;
                type.constructSignatures = void 0;
                type.indexInfos = void 0;
                return type;
            }