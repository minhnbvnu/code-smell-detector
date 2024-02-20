function getRulesMap() {
            if (rulesMapCache === void 0) {
                rulesMapCache = createRulesMap(getAllRules());
            }
            return rulesMapCache;
        }