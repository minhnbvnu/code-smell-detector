function isTypeValueShadow(variable, shadowed) {
                if (options.ignoreTypeValueShadow !== true) {
                    return false;
                }
                if (!('isValueVariable' in variable)) {
                    // this shouldn't happen...
                    return false;
                }
                const [firstDefinition] = shadowed.defs;
                const isShadowedValue = !('isValueVariable' in shadowed) ||
                    !firstDefinition ||
                    (!isTypeImport(firstDefinition) && shadowed.isValueVariable);
                return variable.isValueVariable !== isShadowedValue;
            }