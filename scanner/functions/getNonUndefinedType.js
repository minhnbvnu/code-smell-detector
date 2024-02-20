function getNonUndefinedType(type) {
                const typeOrConstraint = someType(type, isGenericTypeWithUndefinedConstraint) ? mapType(type, (t) => t.flags & 465829888 /* Instantiable */ ? getBaseConstraintOrType(t) : t) : type;
                return getTypeWithFacts(typeOrConstraint, 524288 /* NEUndefined */);
            }