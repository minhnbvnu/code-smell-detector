function shouldAssertFunction(level, name) {
                        if (!shouldAssert(level)) {
                            assertionCache[name] = { level, assertion: Debug2[name] };
                            Debug2[name] = noop;
                            return false;
                        }
                        return true;
                    }