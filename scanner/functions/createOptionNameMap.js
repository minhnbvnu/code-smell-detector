function createOptionNameMap(optionDeclarations2) {
            const optionsNameMap = /* @__PURE__ */ new Map();
            const shortOptionNames = /* @__PURE__ */ new Map();
            forEach(optionDeclarations2, (option) => {
                optionsNameMap.set(option.name.toLowerCase(), option);
                if (option.shortName) {
                    shortOptionNames.set(option.shortName, option.name);
                }
            });
            return { optionsNameMap, shortOptionNames };
        }