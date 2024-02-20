function isPatternMatch({ prefix, suffix }, candidate) {
            return candidate.length >= prefix.length + suffix.length && startsWith(candidate, prefix) && endsWith(candidate, suffix);
        }