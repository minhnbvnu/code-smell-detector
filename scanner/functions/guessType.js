function guessType(key) {
                let type = DefaultValuesForTypeKey.BOOLEAN;
                if (checkAllAliases(key, flags.strings))
                    type = DefaultValuesForTypeKey.STRING;
                else if (checkAllAliases(key, flags.numbers))
                    type = DefaultValuesForTypeKey.NUMBER;
                else if (checkAllAliases(key, flags.bools))
                    type = DefaultValuesForTypeKey.BOOLEAN;
                else if (checkAllAliases(key, flags.arrays))
                    type = DefaultValuesForTypeKey.ARRAY;
                return type;
            }