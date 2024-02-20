function isMemberOfStringMapping(source, target) {
                if (target.flags & 1 /* Any */) {
                    return true;
                }
                if (target.flags & (4 /* String */ | 134217728 /* TemplateLiteral */)) {
                    return isTypeAssignableTo(source, target);
                }
                if (target.flags & 268435456 /* StringMapping */) {
                    const mappingStack = [];
                    while (target.flags & 268435456 /* StringMapping */) {
                        mappingStack.unshift(target.symbol);
                        target = target.type;
                    }
                    const mappedSource = reduceLeft(mappingStack, (memo, value) => getStringMappingType(value, memo), source);
                    return mappedSource === source && isMemberOfStringMapping(source, target);
                }
                return false;
            }