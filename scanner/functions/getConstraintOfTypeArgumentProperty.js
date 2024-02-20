function getConstraintOfTypeArgumentProperty(node, checker) {
            if (!node)
                return void 0;
            if (isTypeNode(node) && isTypeReferenceType(node.parent)) {
                return checker.getTypeArgumentConstraint(node);
            }
            const t = getConstraintOfTypeArgumentProperty(node.parent, checker);
            if (!t)
                return void 0;
            switch (node.kind) {
                case 168 /* PropertySignature */:
                    return checker.getTypeOfPropertyOfContextualType(t, node.symbol.escapedName);
                case 190 /* IntersectionType */:
                case 184 /* TypeLiteral */:
                case 189 /* UnionType */:
                    return t;
            }
        }