function isMappedTypeWithKeyofConstraintDeclaration(type) {
                const constraintDeclaration = getConstraintDeclarationForMappedType(type);
                return constraintDeclaration.kind === 195 /* TypeOperator */ && constraintDeclaration.operator === 141 /* KeyOfKeyword */;
            }