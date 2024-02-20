function transformEnumMember(member) {
                const name = getExpressionForPropertyName(member, 
                /*generateNameForComputedPropertyName*/
                false);
                const valueExpression = transformEnumMemberDeclarationValue(member);
                const innerAssignment = factory2.createAssignment(factory2.createElementAccessExpression(currentNamespaceContainerName, name), valueExpression);
                const outerAssignment = valueExpression.kind === 10 /* StringLiteral */ ? innerAssignment : factory2.createAssignment(factory2.createElementAccessExpression(currentNamespaceContainerName, innerAssignment), name);
                return setTextRange(factory2.createExpressionStatement(setTextRange(outerAssignment, member)), member);
            }