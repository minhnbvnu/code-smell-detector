function tryGetTextOfPropertyName(name) {
            var _a2;
            switch (name.kind) {
                case 79 /* Identifier */:
                case 80 /* PrivateIdentifier */:
                    return ((_a2 = name.emitNode) == null ? void 0 : _a2.autoGenerate) ? void 0 : name.escapedText;
                case 10 /* StringLiteral */:
                case 8 /* NumericLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                    return escapeLeadingUnderscores(name.text);
                case 164 /* ComputedPropertyName */:
                    if (isStringOrNumericLiteralLike(name.expression))
                        return escapeLeadingUnderscores(name.expression.text);
                    return void 0;
                default:
                    return Debug.assertNever(name);
            }
        }