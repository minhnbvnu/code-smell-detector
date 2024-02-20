function checkIndexConstraintForIndexSignature(type, checkInfo) {
                const declaration = checkInfo.declaration;
                const indexInfos = getApplicableIndexInfos(type, checkInfo.keyType);
                const interfaceDeclaration = getObjectFlags(type) & 2 /* Interface */ ? getDeclarationOfKind(type.symbol, 261 /* InterfaceDeclaration */) : void 0;
                const localCheckDeclaration = declaration && getParentOfSymbol(getSymbolOfDeclaration(declaration)) === type.symbol ? declaration : void 0;
                for (const info of indexInfos) {
                    if (info === checkInfo)
                        continue;
                    const localIndexDeclaration = info.declaration && getParentOfSymbol(getSymbolOfDeclaration(info.declaration)) === type.symbol ? info.declaration : void 0;
                    const errorNode = localCheckDeclaration || localIndexDeclaration || (interfaceDeclaration && !some(getBaseTypes(type), (base) => !!getIndexInfoOfType(base, checkInfo.keyType) && !!getIndexTypeOfType(base, info.keyType)) ? interfaceDeclaration : void 0);
                    if (errorNode && !isTypeAssignableTo(checkInfo.type, info.type)) {
                        error(errorNode, Diagnostics._0_index_type_1_is_not_assignable_to_2_index_type_3, typeToString(checkInfo.keyType), typeToString(checkInfo.type), typeToString(info.keyType), typeToString(info.type));
                    }
                }
            }