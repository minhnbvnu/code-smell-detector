function getOrganizeImportsLocale(preferences) {
            let locale = preferences.organizeImportsLocale;
            if (locale === "auto")
                locale = getUILocale();
            if (locale === void 0)
                locale = "en";
            const supportedLocales = Intl.Collator.supportedLocalesOf(locale);
            const resolvedLocale = supportedLocales.length ? supportedLocales[0] : "en";
            return resolvedLocale;
        }