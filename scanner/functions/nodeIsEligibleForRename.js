function nodeIsEligibleForRename(node) {
            switch (node.kind) {
                case 79 /* Identifier */:
                case 80 /* PrivateIdentifier */:
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 108 /* ThisKeyword */:
                    return true;
                case 8 /* NumericLiteral */:
                    return isLiteralNameOfPropertyDeclarationOrIndexAccess(node);
                default:
                    return false;
            }
        }