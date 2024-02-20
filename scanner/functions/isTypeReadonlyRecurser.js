function isTypeReadonlyRecurser(checker, type, options, seenTypes) {
        seenTypes.add(type);
        if ((0, tsutils_1.isUnionType)(type)) {
            // all types in the union must be readonly
            const result = (0, tsutils_1.unionTypeParts)(type).every(t => seenTypes.has(t) ||
                isTypeReadonlyRecurser(checker, t, options, seenTypes) ===
                    3 /* Readonlyness.Readonly */);
            const readonlyness = result ? 3 /* Readonlyness.Readonly */ : 2 /* Readonlyness.Mutable */;
            return readonlyness;
        }
        if ((0, tsutils_1.isIntersectionType)(type)) {
            // Special case for handling arrays/tuples (as readonly arrays/tuples always have mutable methods).
            if (type.types.some(t => checker.isArrayType(t) || checker.isTupleType(t))) {
                const allReadonlyParts = type.types.every(t => seenTypes.has(t) ||
                    isTypeReadonlyRecurser(checker, t, options, seenTypes) ===
                        3 /* Readonlyness.Readonly */);
                return allReadonlyParts ? 3 /* Readonlyness.Readonly */ : 2 /* Readonlyness.Mutable */;
            }
            // Normal case.
            const isReadonlyObject = isTypeReadonlyObject(checker, type, options, seenTypes);
            if (isReadonlyObject !== 1 /* Readonlyness.UnknownType */) {
                return isReadonlyObject;
            }
        }
        if ((0, tsutils_1.isConditionalType)(type)) {
            const result = [type.root.node.trueType, type.root.node.falseType]
                .map(checker.getTypeFromTypeNode)
                .every(t => seenTypes.has(t) ||
                isTypeReadonlyRecurser(checker, t, options, seenTypes) ===
                    3 /* Readonlyness.Readonly */);
            const readonlyness = result ? 3 /* Readonlyness.Readonly */ : 2 /* Readonlyness.Mutable */;
            return readonlyness;
        }
        // all non-object, non-intersection types are readonly.
        // this should only be primitive types
        if (!(0, tsutils_1.isObjectType)(type)) {
            return 3 /* Readonlyness.Readonly */;
        }
        // pure function types are readonly
        if (type.getCallSignatures().length > 0 &&
            type.getProperties().length === 0) {
            return 3 /* Readonlyness.Readonly */;
        }
        const isReadonlyArray = isTypeReadonlyArrayOrTuple(checker, type, options, seenTypes);
        if (isReadonlyArray !== 1 /* Readonlyness.UnknownType */) {
            return isReadonlyArray;
        }
        const isReadonlyObject = isTypeReadonlyObject(checker, type, options, seenTypes);
        /* istanbul ignore else */ if (isReadonlyObject !== 1 /* Readonlyness.UnknownType */) {
            return isReadonlyObject;
        }
        throw new Error('Unhandled type');
    }