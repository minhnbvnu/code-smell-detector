function applyTemplateStringMapping(symbol, texts, types) {
                switch (intrinsicTypeKinds.get(symbol.escapedName)) {
                    case 0 /* Uppercase */:
                        return [texts.map((t) => t.toUpperCase()), types.map((t) => getStringMappingType(symbol, t))];
                    case 1 /* Lowercase */:
                        return [texts.map((t) => t.toLowerCase()), types.map((t) => getStringMappingType(symbol, t))];
                    case 2 /* Capitalize */:
                        return [texts[0] === "" ? texts : [texts[0].charAt(0).toUpperCase() + texts[0].slice(1), ...texts.slice(1)], texts[0] === "" ? [getStringMappingType(symbol, types[0]), ...types.slice(1)] : types];
                    case 3 /* Uncapitalize */:
                        return [texts[0] === "" ? texts : [texts[0].charAt(0).toLowerCase() + texts[0].slice(1), ...texts.slice(1)], texts[0] === "" ? [getStringMappingType(symbol, types[0]), ...types.slice(1)] : types];
                }
                return [texts, types];
            }