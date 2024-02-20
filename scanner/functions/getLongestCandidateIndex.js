function getLongestCandidateIndex(candidates, argsCount) {
                let maxParamsIndex = -1;
                let maxParams = -1;
                for (let i = 0; i < candidates.length; i++) {
                    const candidate = candidates[i];
                    const paramCount = getParameterCount(candidate);
                    if (hasEffectiveRestParameter(candidate) || paramCount >= argsCount) {
                        return i;
                    }
                    if (paramCount > maxParams) {
                        maxParams = paramCount;
                        maxParamsIndex = i;
                    }
                }
                return maxParamsIndex;
            }