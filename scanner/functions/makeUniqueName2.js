function makeUniqueName2(baseName, checkFn = isUniqueName, optimistic, scoped, privateName, prefix, suffix) {
                if (baseName.length > 0 && baseName.charCodeAt(0) === 35 /* hash */) {
                    baseName = baseName.slice(1);
                }
                if (prefix.length > 0 && prefix.charCodeAt(0) === 35 /* hash */) {
                    prefix = prefix.slice(1);
                }
                if (optimistic) {
                    const fullName = formatGeneratedName(privateName, prefix, baseName, suffix);
                    if (checkFn(fullName, privateName)) {
                        if (privateName) {
                            reservePrivateNameInNestedScopes(fullName);
                        }
                        else if (scoped) {
                            reserveNameInNestedScopes(fullName);
                        }
                        else {
                            generatedNames.add(fullName);
                        }
                        return fullName;
                    }
                }
                if (baseName.charCodeAt(baseName.length - 1) !== 95 /* _ */) {
                    baseName += "_";
                }
                let i = 1;
                while (true) {
                    const fullName = formatGeneratedName(privateName, prefix, baseName + i, suffix);
                    if (checkFn(fullName, privateName)) {
                        if (privateName) {
                            reservePrivateNameInNestedScopes(fullName);
                        }
                        else if (scoped) {
                            reserveNameInNestedScopes(fullName);
                        }
                        else {
                            generatedNames.add(fullName);
                        }
                        return fullName;
                    }
                    i++;
                }
            }