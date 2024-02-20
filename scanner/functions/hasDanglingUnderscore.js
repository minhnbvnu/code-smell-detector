function hasDanglingUnderscore(identifier) {
                const len = identifier.length;
                return identifier !== "_" && (identifier[0] === "_" || identifier[len - 1] === "_");
            }