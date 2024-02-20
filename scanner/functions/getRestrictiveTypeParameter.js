function getRestrictiveTypeParameter(tp) {
                return !tp.constraint && !getConstraintDeclaration(tp) || tp.constraint === noConstraintType ? tp : tp.restrictiveInstantiation || (tp.restrictiveInstantiation = createTypeParameter(tp.symbol), tp.restrictiveInstantiation.constraint = noConstraintType, tp.restrictiveInstantiation);
            }