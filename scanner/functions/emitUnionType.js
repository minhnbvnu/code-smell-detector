function emitUnionType(node) {
                emitList(node, node.types, 516 /* UnionTypeConstituents */, parenthesizer.parenthesizeConstituentTypeOfUnionType);
            }