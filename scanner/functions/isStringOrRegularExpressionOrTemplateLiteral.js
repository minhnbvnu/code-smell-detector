function isStringOrRegularExpressionOrTemplateLiteral(kind) {
            if (kind === 10 /* StringLiteral */ || kind === 13 /* RegularExpressionLiteral */ || isTemplateLiteralKind(kind)) {
                return true;
            }
            return false;
        }