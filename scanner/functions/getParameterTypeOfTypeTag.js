function getParameterTypeOfTypeTag(func, parameter) {
                const signature = getSignatureOfTypeTag(func);
                if (!signature)
                    return void 0;
                const pos = func.parameters.indexOf(parameter);
                return parameter.dotDotDotToken ? getRestTypeAtPosition(signature, pos) : getTypeAtPosition(signature, pos);
            }