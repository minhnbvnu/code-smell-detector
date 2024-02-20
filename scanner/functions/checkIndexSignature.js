function checkIndexSignature(kind) {
            const indexInfo = checker.getIndexInfoOfType(type, kind);
            if (indexInfo) {
                if (!indexInfo.isReadonly) {
                    return 2 /* Readonlyness.Mutable */;
                }
                if (indexInfo.type === type || seenTypes.has(indexInfo.type)) {
                    return 3 /* Readonlyness.Readonly */;
                }
                return isTypeReadonlyRecurser(checker, indexInfo.type, options, seenTypes);
            }
            return 1 /* Readonlyness.UnknownType */;
        }