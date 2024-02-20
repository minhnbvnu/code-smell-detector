function formatEnum(value = 0, enumObject, isFlags) {
                        const members = getEnumMembers(enumObject);
                        if (value === 0) {
                            return members.length > 0 && members[0][0] === 0 ? members[0][1] : "0";
                        }
                        if (isFlags) {
                            const result = [];
                            let remainingFlags = value;
                            for (const [enumValue, enumName] of members) {
                                if (enumValue > value) {
                                    break;
                                }
                                if (enumValue !== 0 && enumValue & value) {
                                    result.push(enumName);
                                    remainingFlags &= ~enumValue;
                                }
                            }
                            if (remainingFlags === 0) {
                                return result.join("|");
                            }
                        }
                        else {
                            for (const [enumValue, enumName] of members) {
                                if (enumValue === value) {
                                    return enumName;
                                }
                            }
                        }
                        return value.toString();
                    }