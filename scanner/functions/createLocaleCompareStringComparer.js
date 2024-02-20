function createLocaleCompareStringComparer(locale) {
                        if (locale !== void 0)
                            return createFallbackStringComparer();
                        return (a, b) => compareWithCallback(a, b, compareStrings);
                        function compareStrings(a, b) {
                            return a.localeCompare(b);
                        }
                    }