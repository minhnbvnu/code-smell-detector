function getExpressionForPropertyName(member, generateNameForComputedPropertyName) {
                const name = member.name;
                if (isPrivateIdentifier(name)) {
                    return factory2.createIdentifier("");
                }
                else if (isComputedPropertyName(name)) {
                    return generateNameForComputedPropertyName && !isSimpleInlineableExpression(name.expression) ? factory2.getGeneratedNameForNode(name) : name.expression;
                }
                else if (isIdentifier(name)) {
                    return factory2.createStringLiteral(idText(name));
                }
                else {
                    return factory2.cloneNode(name);
                }
            }