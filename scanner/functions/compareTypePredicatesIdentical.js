function compareTypePredicatesIdentical(source, target, compareTypes) {
                return !(source && target && typePredicateKindsMatch(source, target)) ? 0 /* False */ : source.type === target.type ? -1 /* True */ : source.type && target.type ? compareTypes(source.type, target.type) : 0 /* False */;
            }