function compareWithCallback(a, b, comparer) {
                        if (a === b)
                            return 0 /* EqualTo */;
                        if (a === void 0)
                            return -1 /* LessThan */;
                        if (b === void 0)
                            return 1 /* GreaterThan */;
                        const value = comparer(a, b);
                        return value < 0 ? -1 /* LessThan */ : value > 0 ? 1 /* GreaterThan */ : 0 /* EqualTo */;
                    }