function getOrSetCacheKey() {
                    if (isKeySet) {
                        return key;
                    }
                    isKeySet = true;
                    return key = getFlowCacheKey(reference, declaredType, initialType, flowContainer);
                }