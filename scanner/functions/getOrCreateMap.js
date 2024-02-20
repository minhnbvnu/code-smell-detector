function getOrCreateMap(redirectOptions, create) {
                let result = redirectsMap.get(redirectOptions);
                if (result)
                    return result;
                const key = getRedirectsCacheKey(redirectOptions);
                result = redirectsKeyToMap.get(key);
                if (!result) {
                    if (ownOptions) {
                        const ownKey = getRedirectsCacheKey(ownOptions);
                        if (ownKey === key)
                            result = ownMap;
                        else if (!redirectsKeyToMap.has(ownKey))
                            redirectsKeyToMap.set(ownKey, ownMap);
                    }
                    if (create)
                        result != null ? result : result = /* @__PURE__ */ new Map();
                    if (result)
                        redirectsKeyToMap.set(key, result);
                }
                if (result)
                    redirectsMap.set(redirectOptions, result);
                return result;
            }