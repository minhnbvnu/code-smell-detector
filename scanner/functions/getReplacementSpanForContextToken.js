function getReplacementSpanForContextToken(contextToken) {
            if (!contextToken)
                return void 0;
            switch (contextToken.kind) {
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                    return createTextSpanFromStringLiteralLikeContent(contextToken);
                default:
                    return createTextSpanFromNode(contextToken);
            }
        }