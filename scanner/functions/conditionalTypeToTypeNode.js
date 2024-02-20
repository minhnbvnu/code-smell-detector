function conditionalTypeToTypeNode(type2) {
                        const checkTypeNode = typeToTypeNodeHelper(type2.checkType, context);
                        context.approximateLength += 15;
                        if (context.flags & 4 /* GenerateNamesForShadowedTypeParams */ && type2.root.isDistributive && !(type2.checkType.flags & 262144 /* TypeParameter */)) {
                            const newParam = createTypeParameter(createSymbol(262144 /* TypeParameter */, "T"));
                            const name = typeParameterToName(newParam, context);
                            const newTypeVariable = factory.createTypeReferenceNode(name);
                            context.approximateLength += 37;
                            const newMapper = prependTypeMapping(type2.root.checkType, newParam, type2.mapper);
                            const saveInferTypeParameters2 = context.inferTypeParameters;
                            context.inferTypeParameters = type2.root.inferTypeParameters;
                            const extendsTypeNode2 = typeToTypeNodeHelper(instantiateType(type2.root.extendsType, newMapper), context);
                            context.inferTypeParameters = saveInferTypeParameters2;
                            const trueTypeNode2 = typeToTypeNodeOrCircularityElision(instantiateType(getTypeFromTypeNode(type2.root.node.trueType), newMapper));
                            const falseTypeNode2 = typeToTypeNodeOrCircularityElision(instantiateType(getTypeFromTypeNode(type2.root.node.falseType), newMapper));
                            return factory.createConditionalTypeNode(checkTypeNode, factory.createInferTypeNode(factory.createTypeParameterDeclaration(
                            /*modifiers*/
                            void 0, factory.cloneNode(newTypeVariable.typeName))), factory.createConditionalTypeNode(factory.createTypeReferenceNode(factory.cloneNode(name)), typeToTypeNodeHelper(type2.checkType, context), factory.createConditionalTypeNode(newTypeVariable, extendsTypeNode2, trueTypeNode2, falseTypeNode2), factory.createKeywordTypeNode(144 /* NeverKeyword */)), factory.createKeywordTypeNode(144 /* NeverKeyword */));
                        }
                        const saveInferTypeParameters = context.inferTypeParameters;
                        context.inferTypeParameters = type2.root.inferTypeParameters;
                        const extendsTypeNode = typeToTypeNodeHelper(type2.extendsType, context);
                        context.inferTypeParameters = saveInferTypeParameters;
                        const trueTypeNode = typeToTypeNodeOrCircularityElision(getTrueTypeFromConditionalType(type2));
                        const falseTypeNode = typeToTypeNodeOrCircularityElision(getFalseTypeFromConditionalType(type2));
                        return factory.createConditionalTypeNode(checkTypeNode, extendsTypeNode, trueTypeNode, falseTypeNode);
                    }