function isDynamicPattern(pattern, options = {}) {
        /**
         * A special case with an empty string is necessary for matching patterns that start with a forward slash.
         * An empty string cannot be a dynamic pattern.
         * For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
         */
        if (pattern === '') {
            return false;
        }
        /**
         * When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
         * filepath directly (without read directory).
         */
        if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
            return true;
        }
        if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
            return true;
        }
        if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
            return true;
        }
        if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
            return true;
        }
        return false;
    }