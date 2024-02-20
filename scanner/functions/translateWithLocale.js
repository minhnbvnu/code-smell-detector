function translateWithLocale(locale, key, args) {
    let translation = translations[locale][key];
    if (translation === undefined) {
        console.error("Untranslated key in ", locale, ": ", key);
        if (locale != defaultLocale) {
            translation = translations[defaultLocale][key] || key;
        } else {
            translation = key;
        }
    }

    if (typeof args === "object") {
        // Do argument substitution
        for (const arg in args) {
            translation = translation.replaceAll("{{" + arg + "}}", args[arg]);
        }
    }

    return translation;
}