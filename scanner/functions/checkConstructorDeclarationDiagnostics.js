function checkConstructorDeclarationDiagnostics() {
                    const containingClassDecl = node.parent;
                    if (getClassExtendsHeritageElement(containingClassDecl)) {
                        captureLexicalThis(node.parent, containingClassDecl);
                        const classExtendsNull = classDeclarationExtendsNull(containingClassDecl);
                        const superCall = findFirstSuperCall(node.body);
                        if (superCall) {
                            if (classExtendsNull) {
                                error(superCall, Diagnostics.A_constructor_cannot_contain_a_super_call_when_its_class_extends_null);
                            }
                            const superCallShouldBeRootLevel = (getEmitScriptTarget(compilerOptions) !== 99 /* ESNext */ || !useDefineForClassFields) && (some(node.parent.members, isInstancePropertyWithInitializerOrPrivateIdentifierProperty) || some(node.parameters, (p) => hasSyntacticModifier(p, 16476 /* ParameterPropertyModifier */)));
                            if (superCallShouldBeRootLevel) {
                                if (!superCallIsRootLevelInConstructor(superCall, node.body)) {
                                    error(superCall, Diagnostics.A_super_call_must_be_a_root_level_statement_within_a_constructor_of_a_derived_class_that_contains_initialized_properties_parameter_properties_or_private_identifiers);
                                }
                                else {
                                    let superCallStatement;
                                    for (const statement of node.body.statements) {
                                        if (isExpressionStatement(statement) && isSuperCall(skipOuterExpressions(statement.expression))) {
                                            superCallStatement = statement;
                                            break;
                                        }
                                        if (nodeImmediatelyReferencesSuperOrThis(statement)) {
                                            break;
                                        }
                                    }
                                    if (superCallStatement === void 0) {
                                        error(node, Diagnostics.A_super_call_must_be_the_first_statement_in_the_constructor_to_refer_to_super_or_this_when_a_derived_class_contains_initialized_properties_parameter_properties_or_private_identifiers);
                                    }
                                }
                            }
                        }
                        else if (!classExtendsNull) {
                            error(node, Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call);
                        }
                    }
                }