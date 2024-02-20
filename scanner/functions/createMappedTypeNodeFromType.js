function createMappedTypeNodeFromType(type2) {
                        Debug.assert(!!(type2.flags & 524288 /* Object */));
                        const readonlyToken = type2.declaration.readonlyToken ? factory.createToken(type2.declaration.readonlyToken.kind) : void 0;
                        const questionToken = type2.declaration.questionToken ? factory.createToken(type2.declaration.questionToken.kind) : void 0;
                        let appropriateConstraintTypeNode;
                        let newTypeVariable;
                        if (isMappedTypeWithKeyofConstraintDeclaration(type2)) {
                            if (isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) && context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                                const newParam = createTypeParameter(createSymbol(262144 /* TypeParameter */, "T"));
                                const name = typeParameterToName(newParam, context);
                                newTypeVariable = factory.createTypeReferenceNode(name);
                            }
                            appropriateConstraintTypeNode = factory.createTypeOperatorNode(141 /* KeyOfKeyword */, newTypeVariable || typeToTypeNodeHelper(getModifiersTypeFromMappedType(type2), context));
                        }
                        else {
                            appropriateConstraintTypeNode = typeToTypeNodeHelper(getConstraintTypeFromMappedType(type2), context);
                        }
                        const typeParameterNode = typeParameterToDeclarationWithConstraint(getTypeParameterFromMappedType(type2), context, appropriateConstraintTypeNode);
                        const nameTypeNode = type2.declaration.nameType ? typeToTypeNodeHelper(getNameTypeFromMappedType(type2), context) : void 0;
                        const templateTypeNode = typeToTypeNodeHelper(removeMissingType(getTemplateTypeFromMappedType(type2), !!(getMappedTypeModifiers(type2) & 4 /* IncludeOptional */)), context);
                        const mappedTypeNode = factory.createMappedTypeNode(readonlyToken, typeParameterNode, nameTypeNode, questionToken, templateTypeNode, 
                        /*members*/
                        void 0);
                        context.approximateLength += 10;
                        const result = setEmitFlags(mappedTypeNode, 1 /* SingleLine */);
                        if (isHomomorphicMappedTypeWithNonHomomorphicInstantiation(type2) && context.flags & 4 /* GenerateNamesForShadowedTypeParams */) {
                            const originalConstraint = instantiateType(getConstraintOfTypeParameter(getTypeFromTypeNode(type2.declaration.typeParameter.constraint.type)) || unknownType, type2.mapper);
                            return factory.createConditionalTypeNode(typeToTypeNodeHelper(getModifiersTypeFromMappedType(type2), context), factory.createInferTypeNode(factory.createTypeParameterDeclaration(
                            /*modifiers*/
                            void 0, factory.cloneNode(newTypeVariable.typeName), originalConstraint.flags & 2 /* Unknown */ ? void 0 : typeToTypeNodeHelper(originalConstraint, context))), result, factory.createKeywordTypeNode(144 /* NeverKeyword */));
                        }
                        return result;
                    }