function getDefinitelyFalsyPartOfType(type) {
                return type.flags & 4 /* String */ ? emptyStringType : type.flags & 8 /* Number */ ? zeroType : type.flags & 64 /* BigInt */ ? zeroBigIntType : type === regularFalseType || type === falseType || type.flags & (16384 /* Void */ | 32768 /* Undefined */ | 65536 /* Null */ | 3 /* AnyOrUnknown */) || type.flags & 128 /* StringLiteral */ && type.value === "" || type.flags & 256 /* NumberLiteral */ && type.value === 0 || type.flags & 2048 /* BigIntLiteral */ && isZeroBigInt(type) ? type : neverType;
            }