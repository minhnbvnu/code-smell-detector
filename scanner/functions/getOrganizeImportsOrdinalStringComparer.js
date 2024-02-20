function getOrganizeImportsOrdinalStringComparer(ignoreCase) {
            return ignoreCase ? compareStringsCaseInsensitiveEslintCompatible : compareStringsCaseSensitive;
        }