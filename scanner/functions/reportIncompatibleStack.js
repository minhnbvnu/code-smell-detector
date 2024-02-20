function reportIncompatibleStack() {
                    const stack = incompatibleStack || [];
                    incompatibleStack = void 0;
                    const info = lastSkippedInfo;
                    lastSkippedInfo = void 0;
                    if (stack.length === 1) {
                        reportError(...stack[0]);
                        if (info) {
                            reportRelationError(
                            /*headMessage*/
                            void 0, ...info);
                        }
                        return;
                    }
                    let path = "";
                    const secondaryRootErrors = [];
                    while (stack.length) {
                        const [msg, ...args] = stack.pop();
                        switch (msg.code) {
                            case Diagnostics.Types_of_property_0_are_incompatible.code: {
                                if (path.indexOf("new ") === 0) {
                                    path = `(${path})`;
                                }
                                const str = "" + args[0];
                                if (path.length === 0) {
                                    path = `${str}`;
                                }
                                else if (isIdentifierText(str, getEmitScriptTarget(compilerOptions))) {
                                    path = `${path}.${str}`;
                                }
                                else if (str[0] === "[" && str[str.length - 1] === "]") {
                                    path = `${path}${str}`;
                                }
                                else {
                                    path = `${path}[${str}]`;
                                }
                                break;
                            }
                            case Diagnostics.Call_signature_return_types_0_and_1_are_incompatible.code:
                            case Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible.code:
                            case Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code:
                            case Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code: {
                                if (path.length === 0) {
                                    let mappedMsg = msg;
                                    if (msg.code === Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code) {
                                        mappedMsg = Diagnostics.Call_signature_return_types_0_and_1_are_incompatible;
                                    }
                                    else if (msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code) {
                                        mappedMsg = Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible;
                                    }
                                    secondaryRootErrors.unshift([mappedMsg, args[0], args[1]]);
                                }
                                else {
                                    const prefix = msg.code === Diagnostics.Construct_signature_return_types_0_and_1_are_incompatible.code || msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code ? "new " : "";
                                    const params = msg.code === Diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code || msg.code === Diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1.code ? "" : "...";
                                    path = `${prefix}${path}(${params})`;
                                }
                                break;
                            }
                            case Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target.code: {
                                secondaryRootErrors.unshift([Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, args[0], args[1]]);
                                break;
                            }
                            case Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target.code: {
                                secondaryRootErrors.unshift([Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, args[0], args[1], args[2]]);
                                break;
                            }
                            default:
                                return Debug.fail(`Unhandled Diagnostic: ${msg.code}`);
                        }
                    }
                    if (path) {
                        reportError(path[path.length - 1] === ")" ? Diagnostics.The_types_returned_by_0_are_incompatible_between_these_types : Diagnostics.The_types_of_0_are_incompatible_between_these_types, path);
                    }
                    else {
                        secondaryRootErrors.shift();
                    }
                    for (const [msg, ...args] of secondaryRootErrors) {
                        const originalValue = msg.elidedInCompatabilityPyramid;
                        msg.elidedInCompatabilityPyramid = false;
                        reportError(msg, ...args);
                        msg.elidedInCompatabilityPyramid = originalValue;
                    }
                    if (info) {
                        reportRelationError(
                        /*headMessage*/
                        void 0, ...info);
                    }
                }