function checkAndReportErrorForInvalidInitializer() {
                    if (propertyWithInvalidInitializer && !(useDefineForClassFields && getEmitScriptTarget(compilerOptions) >= 9 /* ES2022 */)) {
                        error(errorLocation, errorLocation && propertyWithInvalidInitializer.type && textRangeContainsPositionInclusive(propertyWithInvalidInitializer.type, errorLocation.pos) ? Diagnostics.Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor : Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor, declarationNameToString(propertyWithInvalidInitializer.name), diagnosticName(nameArg));
                        return true;
                    }
                    return false;
                }