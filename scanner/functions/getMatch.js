function getMatch(pattern, exp) {
                        const matches = pattern.match(exp);
                        return matches ? matches[1] : null;
                    }