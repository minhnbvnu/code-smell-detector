function isTypeOrBaseIdenticalTo(s, t) {
                return t === missingType ? s === t : isTypeIdenticalTo(s, t) || !!(t.flags & 4 /* String */ && s.flags & 128 /* StringLiteral */ || t.flags & 8 /* Number */ && s.flags & 256 /* NumberLiteral */);
            }