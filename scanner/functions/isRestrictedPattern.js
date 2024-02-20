function isRestrictedPattern(importSource, group) {
                return group.matcher.ignores(importSource);
            }