function makeTempVariableName(flags, reservedInNestedScopes, privateName, prefix, suffix) {
                if (prefix.length > 0 && prefix.charCodeAt(0) === 35 /* hash */) {
                    prefix = prefix.slice(1);
                }
                const key = formatGeneratedName(privateName, prefix, "", suffix);
                let tempFlags2 = getTempFlags(key);
                if (flags && !(tempFlags2 & flags)) {
                    const name = flags === 268435456 /* _i */ ? "_i" : "_n";
                    const fullName = formatGeneratedName(privateName, prefix, name, suffix);
                    if (isUniqueName(fullName, privateName)) {
                        tempFlags2 |= flags;
                        if (privateName) {
                            reservePrivateNameInNestedScopes(fullName);
                        }
                        else if (reservedInNestedScopes) {
                            reserveNameInNestedScopes(fullName);
                        }
                        setTempFlags(key, tempFlags2);
                        return fullName;
                    }
                }
                while (true) {
                    const count = tempFlags2 & 268435455 /* CountMask */;
                    tempFlags2++;
                    if (count !== 8 && count !== 13) {
                        const name = count < 26 ? "_" + String.fromCharCode(97 /* a */ + count) : "_" + (count - 26);
                        const fullName = formatGeneratedName(privateName, prefix, name, suffix);
                        if (isUniqueName(fullName, privateName)) {
                            if (privateName) {
                                reservePrivateNameInNestedScopes(fullName);
                            }
                            else if (reservedInNestedScopes) {
                                reserveNameInNestedScopes(fullName);
                            }
                            setTempFlags(key, tempFlags2);
                            return fullName;
                        }
                    }
                }
            }