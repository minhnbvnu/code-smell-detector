function applyStringMapping(symbol, str) {
                switch (intrinsicTypeKinds.get(symbol.escapedName)) {
                    case 0 /* Uppercase */:
                        return str.toUpperCase();
                    case 1 /* Lowercase */:
                        return str.toLowerCase();
                    case 2 /* Capitalize */:
                        return str.charAt(0).toUpperCase() + str.slice(1);
                    case 3 /* Uncapitalize */:
                        return str.charAt(0).toLowerCase() + str.slice(1);
                }
                return str;
            }