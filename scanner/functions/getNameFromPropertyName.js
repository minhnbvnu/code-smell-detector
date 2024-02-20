function getNameFromPropertyName(name) {
            return name.kind === 164 /* ComputedPropertyName */ ? isStringOrNumericLiteralLike(name.expression) ? name.expression.text : void 0 : isPrivateIdentifier(name) ? idText(name) : getTextOfIdentifierOrLiteral(name);
        }