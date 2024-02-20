function markConstEnumAliasAsReferenced(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.constEnumReferenced) {
                    links.constEnumReferenced = true;
                }
            }