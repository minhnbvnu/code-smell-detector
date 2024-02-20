function pushTypeResolution(target, propertyName) {
                const resolutionCycleStartIndex = findResolutionCycleStartIndex(target, propertyName);
                if (resolutionCycleStartIndex >= 0) {
                    const { length: length2 } = resolutionTargets;
                    for (let i = resolutionCycleStartIndex; i < length2; i++) {
                        resolutionResults[i] = false;
                    }
                    return false;
                }
                resolutionTargets.push(target);
                resolutionResults.push(
                /*items*/
                true);
                resolutionPropertyNames.push(propertyName);
                return true;
            }