function checkGrammarAccessor(accessor) {
                if (!(accessor.flags & 16777216 /* Ambient */) && accessor.parent.kind !== 184 /* TypeLiteral */ && accessor.parent.kind !== 261 /* InterfaceDeclaration */) {
                    if (languageVersion < 1 /* ES5 */) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
                    }
                    if (languageVersion < 2 /* ES2015 */ && isPrivateIdentifier(accessor.name)) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.Private_identifiers_are_only_available_when_targeting_ECMAScript_2015_and_higher);
                    }
                    if (accessor.body === void 0 && !hasSyntacticModifier(accessor, 256 /* Abstract */)) {
                        return grammarErrorAtPos(accessor, accessor.end - 1, ";".length, Diagnostics._0_expected, "{");
                    }
                }
                if (accessor.body) {
                    if (hasSyntacticModifier(accessor, 256 /* Abstract */)) {
                        return grammarErrorOnNode(accessor, Diagnostics.An_abstract_accessor_cannot_have_an_implementation);
                    }
                    if (accessor.parent.kind === 184 /* TypeLiteral */ || accessor.parent.kind === 261 /* InterfaceDeclaration */) {
                        return grammarErrorOnNode(accessor.body, Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts);
                    }
                }
                if (accessor.typeParameters) {
                    return grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_have_type_parameters);
                }
                if (!doesAccessorHaveCorrectParameterCount(accessor)) {
                    return grammarErrorOnNode(accessor.name, accessor.kind === 174 /* GetAccessor */ ? Diagnostics.A_get_accessor_cannot_have_parameters : Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                }
                if (accessor.kind === 175 /* SetAccessor */) {
                    if (accessor.type) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                    }
                    const parameter = Debug.checkDefined(getSetAccessorValueParameter(accessor), "Return value does not match parameter count assertion.");
                    if (parameter.dotDotDotToken) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                    }
                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                    }
                    if (parameter.initializer) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                    }
                }
                return false;
            }