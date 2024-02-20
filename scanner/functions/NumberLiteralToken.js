function NumberLiteralToken(value, hasEmptyFraction) {
                _super.call(this, TokenID.NumberLiteral);
            this.value = value;
            this.hasEmptyFraction = hasEmptyFraction;
        }