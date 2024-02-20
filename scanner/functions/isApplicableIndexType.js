function isApplicableIndexType(source, target) {
                return isTypeAssignableTo(source, target) || target === stringType && isTypeAssignableTo(source, numberType) || target === numberType && (source === numericStringType || !!(source.flags & 128 /* StringLiteral */) && isNumericLiteralName(source.value));
            }