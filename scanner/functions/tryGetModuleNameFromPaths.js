function tryGetModuleNameFromPaths(relativeToBaseUrl, paths, allowedEndings, host, compilerOptions) {
            for (const key in paths) {
                for (const patternText2 of paths[key]) {
                    const pattern = normalizePath(patternText2);
                    const indexOfStar = pattern.indexOf("*");
                    const candidates = allowedEndings.map((ending) => ({
                        ending,
                        value: processEnding(relativeToBaseUrl, [ending], compilerOptions)
                    }));
                    if (tryGetExtensionFromPath2(pattern)) {
                        candidates.push({ ending: void 0, value: relativeToBaseUrl });
                    }
                    if (indexOfStar !== -1) {
                        const prefix = pattern.substring(0, indexOfStar);
                        const suffix = pattern.substring(indexOfStar + 1);
                        for (const { ending, value } of candidates) {
                            if (value.length >= prefix.length + suffix.length && startsWith(value, prefix) && endsWith(value, suffix) && validateEnding({ ending, value })) {
                                const matchedStar = value.substring(prefix.length, value.length - suffix.length);
                                return key.replace("*", matchedStar);
                            }
                        }
                    }
                    else if (some(candidates, (c) => c.ending !== 0 /* Minimal */ && pattern === c.value) || some(candidates, (c) => c.ending === 0 /* Minimal */ && pattern === c.value && validateEnding(c))) {
                        return key;
                    }
                }
            }
            function validateEnding({ ending, value }) {
                return ending !== 0 /* Minimal */ || value === processEnding(relativeToBaseUrl, [ending], compilerOptions, host);
            }
        }