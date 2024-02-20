function checkUnmatchedJSDocParameters(node) {
                const jsdocParameters = filter(getJSDocTags(node), isJSDocParameterTag);
                if (!length(jsdocParameters))
                    return;
                const isJs = isInJSFile(node);
                const parameters = /* @__PURE__ */ new Set();
                const excludedParameters = /* @__PURE__ */ new Set();
                forEach(node.parameters, ({ name }, index) => {
                    if (isIdentifier(name)) {
                        parameters.add(name.escapedText);
                    }
                    if (isBindingPattern(name)) {
                        excludedParameters.add(index);
                    }
                });
                const containsArguments = containsArgumentsReference(node);
                if (containsArguments) {
                    const lastJSDocParamIndex = jsdocParameters.length - 1;
                    const lastJSDocParam = jsdocParameters[lastJSDocParamIndex];
                    if (isJs && lastJSDocParam && isIdentifier(lastJSDocParam.name) && lastJSDocParam.typeExpression && lastJSDocParam.typeExpression.type && !parameters.has(lastJSDocParam.name.escapedText) && !excludedParameters.has(lastJSDocParamIndex) && !isArrayType(getTypeFromTypeNode(lastJSDocParam.typeExpression.type))) {
                        error(lastJSDocParam.name, Diagnostics.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name_It_would_match_arguments_if_it_had_an_array_type, idText(lastJSDocParam.name));
                    }
                }
                else {
                    forEach(jsdocParameters, ({ name, isNameFirst }, index) => {
                        if (excludedParameters.has(index) || isIdentifier(name) && parameters.has(name.escapedText)) {
                            return;
                        }
                        if (isQualifiedName(name)) {
                            if (isJs) {
                                error(name, Diagnostics.Qualified_name_0_is_not_allowed_without_a_leading_param_object_1, entityNameToString(name), entityNameToString(name.left));
                            }
                        }
                        else {
                            if (!isNameFirst) {
                                errorOrSuggestion(isJs, name, Diagnostics.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name, idText(name));
                            }
                        }
                    });
                }
            }