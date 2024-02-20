function checkClassLikeDeclaration(node) {
                checkGrammarClassLikeDeclaration(node);
                checkDecorators(node);
                checkCollisionsForDeclarationName(node, node.name);
                checkTypeParameters(getEffectiveTypeParameterDeclarations(node));
                checkExportsOnMergedDeclarations(node);
                const symbol = getSymbolOfDeclaration(node);
                const type = getDeclaredTypeOfSymbol(symbol);
                const typeWithThis = getTypeWithThisArgument(type);
                const staticType = getTypeOfSymbol(symbol);
                checkTypeParameterListsIdentical(symbol);
                checkFunctionOrConstructorSymbol(symbol);
                checkClassForDuplicateDeclarations(node);
                const nodeInAmbientContext = !!(node.flags & 16777216 /* Ambient */);
                if (!nodeInAmbientContext) {
                    checkClassForStaticPropertyNameConflicts(node);
                }
                const baseTypeNode = getEffectiveBaseTypeNode(node);
                if (baseTypeNode) {
                    forEach(baseTypeNode.typeArguments, checkSourceElement);
                    if (languageVersion < 2 /* ES2015 */) {
                        checkExternalEmitHelpers(baseTypeNode.parent, 1 /* Extends */);
                    }
                    const extendsNode = getClassExtendsHeritageElement(node);
                    if (extendsNode && extendsNode !== baseTypeNode) {
                        checkExpression(extendsNode.expression);
                    }
                    const baseTypes = getBaseTypes(type);
                    if (baseTypes.length) {
                        addLazyDiagnostic(() => {
                            const baseType = baseTypes[0];
                            const baseConstructorType = getBaseConstructorTypeOfClass(type);
                            const staticBaseType = getApparentType(baseConstructorType);
                            checkBaseTypeAccessibility(staticBaseType, baseTypeNode);
                            checkSourceElement(baseTypeNode.expression);
                            if (some(baseTypeNode.typeArguments)) {
                                forEach(baseTypeNode.typeArguments, checkSourceElement);
                                for (const constructor of getConstructorsForTypeArguments(staticBaseType, baseTypeNode.typeArguments, baseTypeNode)) {
                                    if (!checkTypeArgumentConstraints(baseTypeNode, constructor.typeParameters)) {
                                        break;
                                    }
                                }
                            }
                            const baseWithThis = getTypeWithThisArgument(baseType, type.thisType);
                            if (!checkTypeAssignableTo(typeWithThis, baseWithThis, 
                            /*errorNode*/
                            void 0)) {
                                issueMemberSpecificError(node, typeWithThis, baseWithThis, Diagnostics.Class_0_incorrectly_extends_base_class_1);
                            }
                            else {
                                checkTypeAssignableTo(staticType, getTypeWithoutSignatures(staticBaseType), node.name || node, Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);
                            }
                            if (baseConstructorType.flags & 8650752 /* TypeVariable */) {
                                if (!isMixinConstructorType(staticType)) {
                                    error(node.name || node, Diagnostics.A_mixin_class_must_have_a_constructor_with_a_single_rest_parameter_of_type_any);
                                }
                                else {
                                    const constructSignatures = getSignaturesOfType(baseConstructorType, 1 /* Construct */);
                                    if (constructSignatures.some((signature) => signature.flags & 4 /* Abstract */) && !hasSyntacticModifier(node, 256 /* Abstract */)) {
                                        error(node.name || node, Diagnostics.A_mixin_class_that_extends_from_a_type_variable_containing_an_abstract_construct_signature_must_also_be_declared_abstract);
                                    }
                                }
                            }
                            if (!(staticBaseType.symbol && staticBaseType.symbol.flags & 32 /* Class */) && !(baseConstructorType.flags & 8650752 /* TypeVariable */)) {
                                const constructors = getInstantiatedConstructorsForTypeArguments(staticBaseType, baseTypeNode.typeArguments, baseTypeNode);
                                if (forEach(constructors, (sig) => !isJSConstructor(sig.declaration) && !isTypeIdenticalTo(getReturnTypeOfSignature(sig), baseType))) {
                                    error(baseTypeNode.expression, Diagnostics.Base_constructors_must_all_have_the_same_return_type);
                                }
                            }
                            checkKindsOfPropertyMemberOverrides(type, baseType);
                        });
                    }
                }
                checkMembersForOverrideModifier(node, type, typeWithThis, staticType);
                const implementedTypeNodes = getEffectiveImplementsTypeNodes(node);
                if (implementedTypeNodes) {
                    for (const typeRefNode of implementedTypeNodes) {
                        if (!isEntityNameExpression(typeRefNode.expression) || isOptionalChain(typeRefNode.expression)) {
                            error(typeRefNode.expression, Diagnostics.A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments);
                        }
                        checkTypeReferenceNode(typeRefNode);
                        addLazyDiagnostic(createImplementsDiagnostics(typeRefNode));
                    }
                }
                addLazyDiagnostic(() => {
                    checkIndexConstraints(type, symbol);
                    checkIndexConstraints(staticType, symbol, 
                    /*isStaticIndex*/
                    true);
                    checkTypeForDuplicateIndexSignatures(node);
                    checkPropertyInitialization(node);
                });
                function createImplementsDiagnostics(typeRefNode) {
                    return () => {
                        const t = getReducedType(getTypeFromTypeNode(typeRefNode));
                        if (!isErrorType(t)) {
                            if (isValidBaseType(t)) {
                                const genericDiag = t.symbol && t.symbol.flags & 32 /* Class */ ? Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass : Diagnostics.Class_0_incorrectly_implements_interface_1;
                                const baseWithThis = getTypeWithThisArgument(t, type.thisType);
                                if (!checkTypeAssignableTo(typeWithThis, baseWithThis, 
                                /*errorNode*/
                                void 0)) {
                                    issueMemberSpecificError(node, typeWithThis, baseWithThis, genericDiag);
                                }
                            }
                            else {
                                error(typeRefNode, Diagnostics.A_class_can_only_implement_an_object_type_or_intersection_of_object_types_with_statically_known_members);
                            }
                        }
                    };
                }
            }