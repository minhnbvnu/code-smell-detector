function IdentifierToken(value, hasEscapeSequence) {
                _super.call(this, TokenID.Identifier);
            this.value = value;
            this.hasEscapeSequence = hasEscapeSequence;
        }