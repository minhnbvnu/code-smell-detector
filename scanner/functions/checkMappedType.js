function checkMappedType(node) {
                checkGrammarMappedType(node);
                checkSourceElement(node.typeParameter);
                checkSourceElement(node.nameType);
                checkSourceElement(node.type);
                if (!node.type) {
                    reportImplicitAny(node, anyType);
                }
                const type = getTypeFromMappedTypeNode(node);
                const nameType = getNameTypeFromMappedType(type);
                if (nameType) {
                    checkTypeAssignableTo(nameType, keyofConstraintType, node.nameType);
                }
                else {
                    const constraintType = getConstraintTypeFromMappedType(type);
                    checkTypeAssignableTo(constraintType, keyofConstraintType, getEffectiveConstraintOfTypeParameter(node.typeParameter));
                }
            }