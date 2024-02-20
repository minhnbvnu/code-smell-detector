function getOrganizeImportsComparerWithDetection(preferences, detectIgnoreCase) {
            var _a2;
            const ignoreCase = typeof preferences.organizeImportsIgnoreCase === "boolean" ? preferences.organizeImportsIgnoreCase : (_a2 = detectIgnoreCase == null ? void 0 : detectIgnoreCase()) != null ? _a2 : false;
            return getOrganizeImportsComparer(preferences, ignoreCase);
        }