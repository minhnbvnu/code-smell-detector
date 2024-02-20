function checkIndexConstraintForProperty(type, prop, propNameType, propType) {
                const declaration = prop.valueDeclaration;
                const name = getNameOfDeclaration(declaration);
                if (name && isPrivateIdentifier(name)) {
                    return;
                }
                const indexInfos = getApplicableIndexInfos(type, propNameType);
                const interfaceDeclaration = getObjectFlags(type) & 2 /* Interface */ ? getDeclarationOfKind(type.symbol, 261 /* InterfaceDeclaration */) : void 0;
                const propDeclaration = declaration && declaration.kind === 223 /* BinaryExpression */ || name && name.kind === 164 /* ComputedPropertyName */ ? declaration : void 0;
                const localPropDeclaration = getParentOfSymbol(prop) === type.symbol ? declaration : void 0;
                for (const info of indexInfos) {
                    const localIndexDeclaration = info.declaration && getParentOfSymbol(getSymbolOfDeclaration(info.declaration)) === type.symbol ? info.declaration : void 0;
                    const errorNode = localPropDeclaration || localIndexDeclaration || (interfaceDeclaration && !some(getBaseTypes(type), (base) => !!getPropertyOfObjectType(base, prop.escapedName) && !!getIndexTypeOfType(base, info.keyType)) ? interfaceDeclaration : void 0);
                    if (errorNode && !isTypeAssignableTo(propType, info.type)) {
                        const diagnostic = createError(errorNode, Diagnostics.Property_0_of_type_1_is_not_assignable_to_2_index_type_3, symbolToString(prop), typeToString(propType), typeToString(info.keyType), typeToString(info.type));
                        if (propDeclaration && errorNode !== propDeclaration) {
                            addRelatedInfo(diagnostic, createDiagnosticForNode(propDeclaration, Diagnostics._0_is_declared_here, symbolToString(prop)));
                        }
                        diagnostics.add(diagnostic);
                    }
                }
            }