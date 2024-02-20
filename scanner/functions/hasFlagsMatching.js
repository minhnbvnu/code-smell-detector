function hasFlagsMatching(arg, ...patterns) {
                const toCheck = [].concat(...patterns);
                return toCheck.some(function (pattern) {
                    const match = arg.match(pattern);
                    return match && hasAnyFlag(match[1]);
                });
            }