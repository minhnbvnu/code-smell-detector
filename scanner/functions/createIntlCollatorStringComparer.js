function createIntlCollatorStringComparer(locale) {
                        const comparer = new Intl.Collator(locale, { usage: "sort", sensitivity: "variant" }).compare;
                        return (a, b) => compareWithCallback(a, b, comparer);
                    }