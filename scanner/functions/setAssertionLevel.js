function setAssertionLevel(level) {
                        const prevAssertionLevel = currentAssertionLevel;
                        currentAssertionLevel = level;
                        if (level > prevAssertionLevel) {
                            for (const key of getOwnKeys(assertionCache)) {
                                const cachedFunc = assertionCache[key];
                                if (cachedFunc !== void 0 && Debug2[key] !== cachedFunc.assertion && level >= cachedFunc.level) {
                                    Debug2[key] = cachedFunc;
                                    assertionCache[key] = void 0;
                                }
                            }
                        }
                    }