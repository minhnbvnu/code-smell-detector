function getResolvedTypeReferenceDirective(sourceFile, typeReferenceDirectiveName, mode) {
            var _a2, _b;
            return (_b = (_a2 = sourceFile == null ? void 0 : sourceFile.resolvedTypeReferenceDirectiveNames) == null ? void 0 : _a2.get(typeReferenceDirectiveName, mode)) == null ? void 0 : _b.resolvedTypeReferenceDirective;
        }