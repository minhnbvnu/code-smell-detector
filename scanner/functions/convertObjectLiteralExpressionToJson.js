function convertObjectLiteralExpressionToJson(node, knownOptions, extraKeyDiagnostics, parentOption) {
                const result = returnValue ? {} : void 0;
                for (const element of node.properties) {
                    if (element.kind !== 299 /* PropertyAssignment */) {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element, Diagnostics.Property_assignment_expected));
                        continue;
                    }
                    if (element.questionToken) {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.questionToken, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"));
                    }
                    if (!isDoubleQuotedString(element.name)) {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.name, Diagnostics.String_literal_with_double_quotes_expected));
                    }
                    const textOfKey = isComputedNonLiteralName(element.name) ? void 0 : getTextOfPropertyName(element.name);
                    const keyText = textOfKey && unescapeLeadingUnderscores(textOfKey);
                    const option = keyText && knownOptions ? knownOptions.get(keyText) : void 0;
                    if (keyText && extraKeyDiagnostics && !option) {
                        if (knownOptions) {
                            errors.push(createUnknownOptionError(keyText, extraKeyDiagnostics, (message, arg0, arg1) => createDiagnosticForNodeInSourceFile(sourceFile, element.name, message, arg0, arg1)));
                        }
                        else {
                            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.name, extraKeyDiagnostics.unknownOptionDiagnostic, keyText));
                        }
                    }
                    const value = convertPropertyValueToJson(element.initializer, option);
                    if (typeof keyText !== "undefined") {
                        if (returnValue) {
                            result[keyText] = value;
                        }
                        if (jsonConversionNotifier && // Current callbacks are only on known parent option or if we are setting values in the root
                            (parentOption || isRootOptionMap(knownOptions))) {
                            const isValidOptionValue = isCompilerOptionsValue(option, value);
                            if (parentOption) {
                                if (isValidOptionValue) {
                                    jsonConversionNotifier.onSetValidOptionKeyValueInParent(parentOption, option, value);
                                }
                            }
                            else if (isRootOptionMap(knownOptions)) {
                                if (isValidOptionValue) {
                                    jsonConversionNotifier.onSetValidOptionKeyValueInRoot(keyText, element.name, value, element.initializer);
                                }
                                else if (!option) {
                                    jsonConversionNotifier.onSetUnknownOptionKeyValueInRoot(keyText, element.name, value, element.initializer);
                                }
                            }
                        }
                    }
                }
                return result;
            }