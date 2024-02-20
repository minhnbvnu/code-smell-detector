function syntaxRequiresTrailingCommaOrSemicolonOrASI(kind) {
            return kind === 176 /* CallSignature */ || kind === 177 /* ConstructSignature */ || kind === 178 /* IndexSignature */ || kind === 168 /* PropertySignature */ || kind === 170 /* MethodSignature */;
        }