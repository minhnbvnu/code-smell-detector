function reportImplicitAny(declaration, type, wideningKind) {
                const typeAsString = typeToString(getWidenedType(type));
                if (isInJSFile(declaration) && !isCheckJsEnabledForFile(getSourceFileOfNode(declaration), compilerOptions)) {
                    return;
                }
                let diagnostic;
                switch (declaration.kind) {
                    case 223 /* BinaryExpression */:
                    case 169 /* PropertyDeclaration */:
                    case 168 /* PropertySignature */:
                        diagnostic = noImplicitAny ? Diagnostics.Member_0_implicitly_has_an_1_type : Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
                        break;
                    case 166 /* Parameter */:
                        const param = declaration;
                        if (isIdentifier(param.name)) {
                            const originalKeywordKind = identifierToKeywordKind(param.name);
                            if ((isCallSignatureDeclaration(param.parent) || isMethodSignature(param.parent) || isFunctionTypeNode(param.parent)) && param.parent.parameters.indexOf(param) > -1 && (resolveName(param, param.name.escapedText, 788968 /* Type */, void 0, param.name.escapedText, 
                            /*isUse*/
                            true) || originalKeywordKind && isTypeNodeKind(originalKeywordKind))) {
                                const newName = "arg" + param.parent.parameters.indexOf(param);
                                const typeName = declarationNameToString(param.name) + (param.dotDotDotToken ? "[]" : "");
                                errorOrSuggestion(noImplicitAny, declaration, Diagnostics.Parameter_has_a_name_but_no_type_Did_you_mean_0_Colon_1, newName, typeName);
                                return;
                            }
                        }
                        diagnostic = declaration.dotDotDotToken ? noImplicitAny ? Diagnostics.Rest_parameter_0_implicitly_has_an_any_type : Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage : noImplicitAny ? Diagnostics.Parameter_0_implicitly_has_an_1_type : Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
                        break;
                    case 205 /* BindingElement */:
                        diagnostic = Diagnostics.Binding_element_0_implicitly_has_an_1_type;
                        if (!noImplicitAny) {
                            return;
                        }
                        break;
                    case 320 /* JSDocFunctionType */:
                        error(declaration, Diagnostics.Function_type_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                        return;
                    case 326 /* JSDocSignature */:
                        if (noImplicitAny && isJSDocOverloadTag(declaration.parent)) {
                            error(declaration.parent.tagName, Diagnostics.This_overload_implicitly_returns_the_type_0_because_it_lacks_a_return_type_annotation, typeAsString);
                        }
                        return;
                    case 259 /* FunctionDeclaration */:
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        if (noImplicitAny && !declaration.name) {
                            if (wideningKind === 3 /* GeneratorYield */) {
                                error(declaration, Diagnostics.Generator_implicitly_has_yield_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_type_annotation, typeAsString);
                            }
                            else {
                                error(declaration, Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                            }
                            return;
                        }
                        diagnostic = !noImplicitAny ? Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage : wideningKind === 3 /* GeneratorYield */ ? Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_yield_type : Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                        break;
                    case 197 /* MappedType */:
                        if (noImplicitAny) {
                            error(declaration, Diagnostics.Mapped_object_type_implicitly_has_an_any_template_type);
                        }
                        return;
                    default:
                        diagnostic = noImplicitAny ? Diagnostics.Variable_0_implicitly_has_an_1_type : Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage;
                }
                errorOrSuggestion(noImplicitAny, declaration, diagnostic, declarationNameToString(getNameOfDeclaration(declaration)), typeAsString);
            }