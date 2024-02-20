function isFunctionTypeParameterNameValueShadow(variable, shadowed) {
                if (options.ignoreFunctionTypeParameterNameValueShadow !== true) {
                    return false;
                }
                if (!('isValueVariable' in variable)) {
                    // this shouldn't happen...
                    return false;
                }
                const isShadowedValue = 'isValueVariable' in shadowed ? shadowed.isValueVariable : true;
                if (!isShadowedValue) {
                    return false;
                }
                return variable.defs.every(def => allowedFunctionVariableDefTypes.has(def.node.type));
            }