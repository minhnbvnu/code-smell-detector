function hasJSDocPostfixQuestion(type) {
                if (isJSDocNullableType(type))
                    return type.postfix;
                if (isNamedTupleMember(type))
                    return hasJSDocPostfixQuestion(type.type);
                if (isFunctionTypeNode(type) || isConstructorTypeNode(type) || isTypeOperatorNode(type))
                    return hasJSDocPostfixQuestion(type.type);
                if (isConditionalTypeNode(type))
                    return hasJSDocPostfixQuestion(type.falseType);
                if (isUnionTypeNode(type))
                    return hasJSDocPostfixQuestion(last(type.types));
                if (isIntersectionTypeNode(type))
                    return hasJSDocPostfixQuestion(last(type.types));
                if (isInferTypeNode(type))
                    return !!type.typeParameter.constraint && hasJSDocPostfixQuestion(type.typeParameter.constraint);
                return false;
            }