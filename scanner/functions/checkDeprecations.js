function checkDeprecations(deprecatedIn, removedIn, createDiagnostic, fn) {
                const deprecatedInVersion = new Version(deprecatedIn);
                const removedInVersion = new Version(removedIn);
                const typescriptVersion = new Version(typeScriptVersion3 || versionMajorMinor);
                const ignoreDeprecationsVersion = getIgnoreDeprecationsVersion();
                const mustBeRemoved = !(removedInVersion.compareTo(typescriptVersion) === 1 /* GreaterThan */);
                const canBeSilenced = !mustBeRemoved && ignoreDeprecationsVersion.compareTo(deprecatedInVersion) === -1 /* LessThan */;
                if (mustBeRemoved || canBeSilenced) {
                    fn((name, value, useInstead) => {
                        if (mustBeRemoved) {
                            if (value === void 0) {
                                createDiagnostic(name, value, useInstead, Diagnostics.Option_0_has_been_removed_Please_remove_it_from_your_configuration, name);
                            }
                            else {
                                createDiagnostic(name, value, useInstead, Diagnostics.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration, name, value);
                            }
                        }
                        else {
                            if (value === void 0) {
                                createDiagnostic(name, value, useInstead, Diagnostics.Option_0_is_deprecated_and_will_stop_functioning_in_TypeScript_1_Specify_compilerOption_ignoreDeprecations_Colon_2_to_silence_this_error, name, removedIn, deprecatedIn);
                            }
                            else {
                                createDiagnostic(name, value, useInstead, Diagnostics.Option_0_1_is_deprecated_and_will_stop_functioning_in_TypeScript_2_Specify_compilerOption_ignoreDeprecations_Colon_3_to_silence_this_error, name, value, removedIn, deprecatedIn);
                            }
                        }
                    });
                }
            }