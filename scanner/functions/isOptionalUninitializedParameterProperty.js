function isOptionalUninitializedParameterProperty(parameter) {
                return strictNullChecks && isOptionalParameter(parameter) && !parameter.initializer && hasSyntacticModifier(parameter, 16476 /* ParameterPropertyModifier */);
            }