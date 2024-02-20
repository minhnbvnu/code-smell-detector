function applyToParameterTypes(source, target, callback) {
                const sourceCount = getParameterCount(source);
                const targetCount = getParameterCount(target);
                const sourceRestType = getEffectiveRestType(source);
                const targetRestType = getEffectiveRestType(target);
                const targetNonRestCount = targetRestType ? targetCount - 1 : targetCount;
                const paramCount = sourceRestType ? targetNonRestCount : Math.min(sourceCount, targetNonRestCount);
                const sourceThisType = getThisTypeOfSignature(source);
                if (sourceThisType) {
                    const targetThisType = getThisTypeOfSignature(target);
                    if (targetThisType) {
                        callback(sourceThisType, targetThisType);
                    }
                }
                for (let i = 0; i < paramCount; i++) {
                    callback(getTypeAtPosition(source, i), getTypeAtPosition(target, i));
                }
                if (targetRestType) {
                    callback(getRestTypeAtPosition(source, paramCount), targetRestType);
                }
            }