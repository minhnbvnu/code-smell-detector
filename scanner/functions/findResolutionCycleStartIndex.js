function findResolutionCycleStartIndex(target, propertyName) {
                for (let i = resolutionTargets.length - 1; i >= 0; i--) {
                    if (resolutionTargetHasProperty(resolutionTargets[i], resolutionPropertyNames[i])) {
                        return -1;
                    }
                    if (resolutionTargets[i] === target && resolutionPropertyNames[i] === propertyName) {
                        return i;
                    }
                }
                return -1;
            }