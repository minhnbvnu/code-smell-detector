function createStringComparer(locale) {
                        if (locale === void 0) {
                            return defaultComparer || (defaultComparer = stringComparerFactory(locale));
                        }
                        else if (locale === "en-US") {
                            return enUSComparer || (enUSComparer = stringComparerFactory(locale));
                        }
                        else {
                            return stringComparerFactory(locale);
                        }
                    }