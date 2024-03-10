function getTypeFacts(type) {
                if (type.flags & (2097152 /* Intersection */ | 465829888 /* Instantiable */)) {
                    type = getBaseConstraintOfType(type) || unknownType;
                }
                const flags = type.flags;
                if (flags & (4 /* String */ | 268435456 /* StringMapping */)) {
                    return strictNullChecks ? 16317953 /* StringStrictFacts */ : 16776705 /* StringFacts */;
                }
                if (flags & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */)) {
                    const isEmpty = flags & 128 /* StringLiteral */ && type.value === "";
                    return strictNullChecks ? isEmpty ? 12123649 /* EmptyStringStrictFacts */ : 7929345 /* NonEmptyStringStrictFacts */ : isEmpty ? 12582401 /* EmptyStringFacts */ : 16776705 /* NonEmptyStringFacts */;
                }
                if (flags & (8 /* Number */ | 32 /* Enum */)) {
                    return strictNullChecks ? 16317698 /* NumberStrictFacts */ : 16776450 /* NumberFacts */;
                }
                if (flags & 256 /* NumberLiteral */) {
                    const isZero = type.value === 0;
                    return strictNullChecks ? isZero ? 12123394 /* ZeroNumberStrictFacts */ : 7929090 /* NonZeroNumberStrictFacts */ : isZero ? 12582146 /* ZeroNumberFacts */ : 16776450 /* NonZeroNumberFacts */;
                }
                if (flags & 64 /* BigInt */) {
                    return strictNullChecks ? 16317188 /* BigIntStrictFacts */ : 16775940 /* BigIntFacts */;
                }
                if (flags & 2048 /* BigIntLiteral */) {
                    const isZero = isZeroBigInt(type);
                    return strictNullChecks ? isZero ? 12122884 /* ZeroBigIntStrictFacts */ : 7928580 /* NonZeroBigIntStrictFacts */ : isZero ? 12581636 /* ZeroBigIntFacts */ : 16775940 /* NonZeroBigIntFacts */;
                }
                if (flags & 16 /* Boolean */) {
                    return strictNullChecks ? 16316168 /* BooleanStrictFacts */ : 16774920 /* BooleanFacts */;
                }
                if (flags & 528 /* BooleanLike */) {
                    return strictNullChecks ? type === falseType || type === regularFalseType ? 12121864 /* FalseStrictFacts */ : 7927560 /* TrueStrictFacts */ : type === falseType || type === regularFalseType ? 12580616 /* FalseFacts */ : 16774920 /* TrueFacts */;
                }
                if (flags & 524288 /* Object */) {
                    return getObjectFlags(type) & 16 /* Anonymous */ && isEmptyObjectType(type) ? strictNullChecks ? 83427327 /* EmptyObjectStrictFacts */ : 83886079 /* EmptyObjectFacts */ : isFunctionObjectType(type) ? strictNullChecks ? 7880640 /* FunctionStrictFacts */ : 16728e3 /* FunctionFacts */ : strictNullChecks ? 7888800 /* ObjectStrictFacts */ : 16736160 /* ObjectFacts */;
                }
                if (flags & 16384 /* Void */) {
                    return 9830144 /* VoidFacts */;
                }
                if (flags & 32768 /* Undefined */) {
                    return 26607360 /* UndefinedFacts */;
                }
                if (flags & 65536 /* Null */) {
                    return 42917664 /* NullFacts */;
                }
                if (flags & 12288 /* ESSymbolLike */) {
                    return strictNullChecks ? 7925520 /* SymbolStrictFacts */ : 16772880 /* SymbolFacts */;
                }
                if (flags & 67108864 /* NonPrimitive */) {
                    return strictNullChecks ? 7888800 /* ObjectStrictFacts */ : 16736160 /* ObjectFacts */;
                }
                if (flags & 131072 /* Never */) {
                    return 0 /* None */;
                }
                if (flags & 1048576 /* Union */) {
                    return reduceLeft(type.types, (facts, t) => facts | getTypeFacts(t), 0 /* None */);
                }
                if (flags & 2097152 /* Intersection */) {
                    return getIntersectionTypeFacts(type);
                }
                return 83886079 /* UnknownFacts */;
            }