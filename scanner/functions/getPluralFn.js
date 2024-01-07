function getPluralFn(lang) {
    return PLURALS[lang] || DEFAULT_PLURAL_FN;
}