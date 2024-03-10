function convertToObjectWorker(sourceFile, rootExpression, errors, returnValue, knownRootOptions, jsonConversionNotifier) {
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
            function convertPropertyValueToJson(valueExpression, option) {
                let invalidReported;
                switch (valueExpression.kind) {
                    case 110 /* TrueKeyword */:
                        reportInvalidOptionValue(option && option.type !== "boolean" && (option.type !== "listOrElement" || option.element.type !== "boolean"));
                        return validateValue(
                        /*value*/
                        true);
                    case 95 /* FalseKeyword */:
                        reportInvalidOptionValue(option && option.type !== "boolean" && (option.type !== "listOrElement" || option.element.type !== "boolean"));
                        return validateValue(
                        /*value*/
                        false);
                    case 104 /* NullKeyword */:
                        reportInvalidOptionValue(option && option.name === "extends");
                        return validateValue(
                        /*value*/
                        null);
                    case 10 /* StringLiteral */:
                        if (!isDoubleQuotedString(valueExpression)) {
                            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.String_literal_with_double_quotes_expected));
                        }
                        reportInvalidOptionValue(option && isString(option.type) && option.type !== "string" && (option.type !== "listOrElement" || isString(option.element.type) && option.element.type !== "string"));
                        const text = valueExpression.text;
                        if (option) {
                            Debug.assert(option.type !== "listOrElement" || option.element.type === "string", "Only string or array of string is handled for now");
                        }
                        if (option && !isString(option.type)) {
                            const customOption = option;
                            if (!customOption.type.has(text.toLowerCase())) {
                                errors.push(createDiagnosticForInvalidCustomType(customOption, (message, arg0, arg1) => createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, message, arg0, arg1)));
                                invalidReported = true;
                            }
                        }
                        return validateValue(text);
                    case 8 /* NumericLiteral */:
                        reportInvalidOptionValue(option && option.type !== "number" && (option.type !== "listOrElement" || option.element.type !== "number"));
                        return validateValue(Number(valueExpression.text));
                    case 221 /* PrefixUnaryExpression */:
                        if (valueExpression.operator !== 40 /* MinusToken */ || valueExpression.operand.kind !== 8 /* NumericLiteral */) {
                            break;
                        }
                        reportInvalidOptionValue(option && option.type !== "number" && (option.type !== "listOrElement" || option.element.type !== "number"));
                        return validateValue(-Number(valueExpression.operand.text));
                    case 207 /* ObjectLiteralExpression */:
                        reportInvalidOptionValue(option && option.type !== "object" && (option.type !== "listOrElement" || option.element.type !== "object"));
                        const objectLiteralExpression = valueExpression;
                        if (option) {
                            const { elementOptions, extraKeyDiagnostics, name: optionName } = option;
                            return validateValue(convertObjectLiteralExpressionToJson(objectLiteralExpression, elementOptions, extraKeyDiagnostics, optionName));
                        }
                        else {
                            return validateValue(convertObjectLiteralExpressionToJson(objectLiteralExpression, 
                            /* knownOptions*/
                            void 0, 
                            /*extraKeyDiagnosticMessage */
                            void 0, 
                            /*parentOption*/
                            void 0));
                        }
                    case 206 /* ArrayLiteralExpression */:
                        reportInvalidOptionValue(option && option.type !== "list" && option.type !== "listOrElement");
                        return validateValue(convertArrayLiteralExpressionToJson(valueExpression.elements, option && option.element));
                }
                if (option) {
                    reportInvalidOptionValue(
                    /*isError*/
                    true);
                }
                else {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal));
                }
                return void 0;
                function validateValue(value) {
                    var _a2;
                    if (!invalidReported) {
                        const diagnostic = (_a2 = option == null ? void 0 : option.extraValidation) == null ? void 0 : _a2.call(option, value);
                        if (diagnostic) {
                            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, ...diagnostic));
                            return void 0;
                        }
                    }
                    return value;
                }
                function reportInvalidOptionValue(isError) {
                    if (isError) {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, option.name, getCompilerOptionValueTypeString(option)));
                        invalidReported = true;
                    }
                }
            }