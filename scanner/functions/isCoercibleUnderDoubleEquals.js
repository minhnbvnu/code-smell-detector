function isCoercibleUnderDoubleEquals(source, target) {
                return (source.flags & (8 /* Number */ | 4 /* String */ | 512 /* BooleanLiteral */)) !== 0 && (target.flags & (8 /* Number */ | 4 /* String */ | 16 /* Boolean */)) !== 0;
            }