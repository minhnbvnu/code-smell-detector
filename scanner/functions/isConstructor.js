function isConstructor(name) {
                const match = CTOR_PREFIX_REGEX.exec(name);
                // Not a constructor if name has no characters apart from '_', '$' and digits e.g. '_', '$$', '_8'
                if (!match) {
                    return false;
                }
                const firstChar = name.charAt(match.index);
                return firstChar === firstChar.toUpperCase();
            }