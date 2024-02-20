function getStringComparerFactory() {
                        if (typeof Intl === "object" && typeof Intl.Collator === "function") {
                            return createIntlCollatorStringComparer;
                        }
                        if (typeof String.prototype.localeCompare === "function" && typeof String.prototype.toLocaleUpperCase === "function" && "a".localeCompare("B") < 0) {
                            return createLocaleCompareStringComparer;
                        }
                        return createFallbackStringComparer;
                    }