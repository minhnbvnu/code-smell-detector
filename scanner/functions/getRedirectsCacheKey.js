function getRedirectsCacheKey(options) {
                let result = optionsToRedirectsKey.get(options);
                if (!result) {
                    optionsToRedirectsKey.set(options, result = getKeyForCompilerOptions(options, moduleResolutionOptionDeclarations));
                }
                return result;
            }