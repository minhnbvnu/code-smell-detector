function reportErrorsFromWidening(declaration, type, wideningKind) {
                addLazyDiagnostic(() => {
                    if (noImplicitAny && getObjectFlags(type) & 65536 /* ContainsWideningType */ && (!wideningKind || !getContextualSignatureForFunctionLikeDeclaration(declaration))) {
                        if (!reportWideningErrorsInType(type)) {
                            reportImplicitAny(declaration, type, wideningKind);
                        }
                    }
                });
            }