function notBaseTenLosesPrecision(node) {
                const rawString = getRaw(node).toUpperCase();
                let base = 0;
                if (rawString.startsWith("0B")) {
                    base = 2;
                }
                else if (rawString.startsWith("0X")) {
                    base = 16;
                }
                else {
                    base = 8;
                }
                return !rawString.endsWith(node.value.toString(base).toUpperCase());
            }