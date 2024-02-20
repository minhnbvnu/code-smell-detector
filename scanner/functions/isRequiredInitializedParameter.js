function isRequiredInitializedParameter(parameter) {
                return !!strictNullChecks && !isOptionalParameter(parameter) && !isJSDocParameterTag(parameter) && !!parameter.initializer && !hasSyntacticModifier(parameter, 16476 /* ParameterPropertyModifier */);
            }