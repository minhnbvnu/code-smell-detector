function isNumericName(name) {
                switch (name.kind) {
                    case 164 /* ComputedPropertyName */:
                        return isNumericComputedName(name);
                    case 79 /* Identifier */:
                        return isNumericLiteralName(name.escapedText);
                    case 8 /* NumericLiteral */:
                    case 10 /* StringLiteral */:
                        return isNumericLiteralName(name.text);
                    default:
                        return false;
                }
            }