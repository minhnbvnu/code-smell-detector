function getOptionDeclarationFromName(getOptionNameMap, optionName, allowShort = false) {
            optionName = optionName.toLowerCase();
            const { optionsNameMap, shortOptionNames } = getOptionNameMap();
            if (allowShort) {
                const short = shortOptionNames.get(optionName);
                if (short !== void 0) {
                    optionName = short;
                }
            }
            return optionsNameMap.get(optionName);
        }