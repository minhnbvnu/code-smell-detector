function getExternalModuleName2(specifier) {
            return specifier !== void 0 && isStringLiteralLike(specifier) ? specifier.text : void 0;
        }