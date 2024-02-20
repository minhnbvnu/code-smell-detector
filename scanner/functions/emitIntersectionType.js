function emitIntersectionType(node) {
                emitList(node, node.types, 520 /* IntersectionTypeConstituents */, parenthesizer.parenthesizeConstituentTypeOfIntersectionType);
            }