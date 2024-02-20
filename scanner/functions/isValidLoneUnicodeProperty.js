function isValidLoneUnicodeProperty(version, value) {
        return ((version >= 2018 && binPropertySets.es2018.has(value)) ||
            (version >= 2019 && binPropertySets.es2019.has(value)) ||
            (version >= 2021 && binPropertySets.es2021.has(value)));
    }