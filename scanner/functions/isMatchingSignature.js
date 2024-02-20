function isMatchingSignature(source, target, partialMatch) {
                const sourceParameterCount = getParameterCount(source);
                const targetParameterCount = getParameterCount(target);
                const sourceMinArgumentCount = getMinArgumentCount(source);
                const targetMinArgumentCount = getMinArgumentCount(target);
                const sourceHasRestParameter = hasEffectiveRestParameter(source);
                const targetHasRestParameter = hasEffectiveRestParameter(target);
                if (sourceParameterCount === targetParameterCount && sourceMinArgumentCount === targetMinArgumentCount && sourceHasRestParameter === targetHasRestParameter) {
                    return true;
                }
                if (partialMatch && sourceMinArgumentCount <= targetMinArgumentCount) {
                    return true;
                }
                return false;
            }