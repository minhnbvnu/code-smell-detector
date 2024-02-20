function isTypePresencePossible(type, propName, assumeTrue) {
                    const prop = getPropertyOfType(type, propName);
                    return prop ? !!(prop.flags & 16777216 /* Optional */) || assumeTrue : !!getApplicableIndexInfoForName(type, propName) || !assumeTrue;
                }