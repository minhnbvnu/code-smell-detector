function checkAndReportErrorForUsingTypeAsValue(errorLocation, name, meaning) {
                if (meaning & 111551 /* Value */) {
                    if (isPrimitiveTypeName(name)) {
                        if (isExtendedByInterface(errorLocation)) {
                            error(errorLocation, Diagnostics.An_interface_cannot_extend_a_primitive_type_like_0_an_interface_can_only_extend_named_types_and_classes, unescapeLeadingUnderscores(name));
                        }
                        else {
                            error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here, unescapeLeadingUnderscores(name));
                        }
                        return true;
                    }
                    const symbol = resolveSymbol(resolveName(errorLocation, name, 788968 /* Type */ & ~111551 /* Value */, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    false));
                    const allFlags = symbol && getAllSymbolFlags(symbol);
                    if (symbol && allFlags !== void 0 && !(allFlags & 111551 /* Value */)) {
                        const rawName = unescapeLeadingUnderscores(name);
                        if (isES2015OrLaterConstructorName(name)) {
                            error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_es2015_or_later, rawName);
                        }
                        else if (maybeMappedType(errorLocation, symbol)) {
                            error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0, rawName, rawName === "K" ? "P" : "K");
                        }
                        else {
                            error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here, rawName);
                        }
                        return true;
                    }
                }
                return false;
            }