function getOrganizeImportsUnicodeStringComparer(ignoreCase, preferences) {
            var _a2, _b, _c;
            const resolvedLocale = getOrganizeImportsLocale(preferences);
            const caseFirst = (_a2 = preferences.organizeImportsCaseFirst) != null ? _a2 : false;
            const numeric = (_b = preferences.organizeImportsNumericCollation) != null ? _b : false;
            const accents = (_c = preferences.organizeImportsAccentCollation) != null ? _c : true;
            const sensitivity = ignoreCase ? accents ? "accent" : "base" : accents ? "variant" : "case";
            const collator = new Intl.Collator(resolvedLocale, {
                usage: "sort",
                caseFirst: caseFirst || "false",
                sensitivity,
                numeric
            });
            return collator.compare;
        }