function hasPrimitiveConstraint(type) {
                const constraint = getConstraintOfTypeParameter(type);
                return !!constraint && maybeTypeOfKind(constraint.flags & 16777216 /* Conditional */ ? getDefaultConstraintOfConditionalType(constraint) : constraint, 134348796 /* Primitive */ | 4194304 /* Index */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */);
            }