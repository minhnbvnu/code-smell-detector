function getOrganizeImportsComparer(preferences, ignoreCase) {
            var _a2;
            const collation = (_a2 = preferences.organizeImportsCollation) != null ? _a2 : "ordinal";
            return collation === "unicode" ? getOrganizeImportsUnicodeStringComparer(ignoreCase, preferences) : getOrganizeImportsOrdinalStringComparer(ignoreCase);
        }