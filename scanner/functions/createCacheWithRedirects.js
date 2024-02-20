function createCacheWithRedirects(ownOptions) {
            const redirectsMap = /* @__PURE__ */ new Map();
            const optionsToRedirectsKey = /* @__PURE__ */ new Map();
            const redirectsKeyToMap = /* @__PURE__ */ new Map();
            let ownMap = /* @__PURE__ */ new Map();
            if (ownOptions)
                redirectsMap.set(ownOptions, ownMap);
            return {
                getMapOfCacheRedirects,
                getOrCreateMapOfCacheRedirects,
                update,
                clear: clear2
            };
            function getMapOfCacheRedirects(redirectedReference) {
                return redirectedReference ? getOrCreateMap(redirectedReference.commandLine.options, 
                /*create*/
                false) : ownMap;
            }
            function getOrCreateMapOfCacheRedirects(redirectedReference) {
                return redirectedReference ? getOrCreateMap(redirectedReference.commandLine.options, 
                /*create*/
                true) : ownMap;
            }
            function update(newOptions) {
                if (ownOptions !== newOptions) {
                    if (ownOptions)
                        ownMap = getOrCreateMap(newOptions, 
                        /*create*/
                        true);
                    else
                        redirectsMap.set(newOptions, ownMap);
                    ownOptions = newOptions;
                }
            }
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
            function clear2() {
                const ownKey = ownOptions && optionsToRedirectsKey.get(ownOptions);
                ownMap.clear();
                redirectsMap.clear();
                optionsToRedirectsKey.clear();
                redirectsKeyToMap.clear();
                if (ownOptions) {
                    if (ownKey)
                        optionsToRedirectsKey.set(ownOptions, ownKey);
                    redirectsMap.set(ownOptions, ownMap);
                }
            }
            function getRedirectsCacheKey(options) {
                let result = optionsToRedirectsKey.get(options);
                if (!result) {
                    optionsToRedirectsKey.set(options, result = getKeyForCompilerOptions(options, moduleResolutionOptionDeclarations));
                }
                return result;
            }
        }