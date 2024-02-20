function isPropertyNameLiteral(node) {
            switch (node.kind) {
                case 79 /* Identifier */:
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 8 /* NumericLiteral */:
                    return true;
                default:
                    return false;
            }
        }