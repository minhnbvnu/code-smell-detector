function RegularExpressionLiteralToken(regex) {
                _super.call(this, TokenID.RegularExpressionLiteral);
            this.regex = regex;
        }