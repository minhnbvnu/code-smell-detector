function isAritySmaller(signature, target) {
                let targetParameterCount = 0;
                for (; targetParameterCount < target.parameters.length; targetParameterCount++) {
                    const param = target.parameters[targetParameterCount];
                    if (param.initializer || param.questionToken || param.dotDotDotToken || isJSDocOptionalParameter(param)) {
                        break;
                    }
                }
                if (target.parameters.length && parameterIsThisKeyword(target.parameters[0])) {
                    targetParameterCount--;
                }
                return !hasEffectiveRestParameter(signature) && getParameterCount(signature) < targetParameterCount;
            }