function createFallbackStringComparer() {
                        return (a, b) => compareWithCallback(a, b, compareDictionaryOrder);
                        function compareDictionaryOrder(a, b) {
                            return compareStrings(a.toUpperCase(), b.toUpperCase()) || compareStrings(a, b);
                        }
                        function compareStrings(a, b) {
                            return a < b ? -1 /* LessThan */ : a > b ? 1 /* GreaterThan */ : 0 /* EqualTo */;
                        }
                    }