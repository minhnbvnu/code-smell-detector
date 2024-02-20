function getModuleSpecifierText(promotedDeclaration) {
            var _a2, _b;
            return promotedDeclaration.kind === 268 /* ImportEqualsDeclaration */ ? ((_b = tryCast((_a2 = tryCast(promotedDeclaration.moduleReference, isExternalModuleReference)) == null ? void 0 : _a2.expression, isStringLiteralLike)) == null ? void 0 : _b.text) || promotedDeclaration.moduleReference.getText() : cast(promotedDeclaration.parent.moduleSpecifier, isStringLiteral).text;
        }