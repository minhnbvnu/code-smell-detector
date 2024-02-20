function visibilityToString(flags) {
                if (flags === 8 /* Private */) {
                    return "private";
                }
                if (flags === 16 /* Protected */) {
                    return "protected";
                }
                return "public";
            }