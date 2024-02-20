function transformEnumMemberDeclarationValue(member) {
                const value = resolver.getConstantValue(member);
                if (value !== void 0) {
                    return typeof value === "string" ? factory2.createStringLiteral(value) : factory2.createNumericLiteral(value);
                }
                else {
                    enableSubstitutionForNonQualifiedEnumMembers();
                    if (member.initializer) {
                        return Debug.checkDefined(visitNode(member.initializer, visitor, isExpression));
                    }
                    else {
                        return factory2.createVoidZero();
                    }
                }
            }