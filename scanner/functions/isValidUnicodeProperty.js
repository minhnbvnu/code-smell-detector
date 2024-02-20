function isValidUnicodeProperty(version, name, value) {
        if (gcNameSet.has(name)) {
            return version >= 2018 && gcValueSets.es2018.has(value);
        }
        if (scNameSet.has(name)) {
            return ((version >= 2018 && scValueSets.es2018.has(value)) ||
                (version >= 2019 && scValueSets.es2019.has(value)) ||
                (version >= 2020 && scValueSets.es2020.has(value)) ||
                (version >= 2021 && scValueSets.es2021.has(value)) ||
                (version >= 2022 && scValueSets.es2022.has(value)));
        }
        return false;
    }