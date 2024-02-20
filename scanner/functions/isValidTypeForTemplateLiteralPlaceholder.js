function isValidTypeForTemplateLiteralPlaceholder(source, target) {
                if (source === target || target.flags & (1 /* Any */ | 4 /* String */)) {
                    return true;
                }
                if (source.flags & 128 /* StringLiteral */) {
                    const value = source.value;
                    return !!(target.flags & 8 /* Number */ && isValidNumberString(value, 
                    /*roundTripOnly*/
                    false) || target.flags & 64 /* BigInt */ && isValidBigIntString(value, 
                    /*roundTripOnly*/
                    false) || target.flags & (512 /* BooleanLiteral */ | 98304 /* Nullable */) && value === target.intrinsicName || target.flags & 268435456 /* StringMapping */ && isMemberOfStringMapping(getStringLiteralType(value), target));
                }
                if (source.flags & 134217728 /* TemplateLiteral */) {
                    const texts = source.texts;
                    return texts.length === 2 && texts[0] === "" && texts[1] === "" && isTypeAssignableTo(source.types[0], target);
                }
                return isTypeAssignableTo(source, target);
            }