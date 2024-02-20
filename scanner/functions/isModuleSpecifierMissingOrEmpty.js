function isModuleSpecifierMissingOrEmpty(specifier) {
            var _a2;
            if (nodeIsMissing(specifier))
                return true;
            return !((_a2 = tryCast(isExternalModuleReference(specifier) ? specifier.expression : specifier, isStringLiteralLike)) == null ? void 0 : _a2.text);
        }