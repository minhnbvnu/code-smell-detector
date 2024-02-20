function getEnumMembers(enumObject) {
                        const existing = enumMemberCache.get(enumObject);
                        if (existing) {
                            return existing;
                        }
                        const result = [];
                        for (const name in enumObject) {
                            const value = enumObject[name];
                            if (typeof value === "number") {
                                result.push([value, name]);
                            }
                        }
                        const sorted = stableSort(result, (x, y) => compareValues(x[0], y[0]));
                        enumMemberCache.set(enumObject, sorted);
                        return sorted;
                    }