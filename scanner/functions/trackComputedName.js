function trackComputedName(accessExpression, enclosingDeclaration, context) {
                    if (!context.tracker.canTrackSymbol)
                        return;
                    const firstIdentifier = getFirstIdentifier(accessExpression);
                    const name = resolveName(firstIdentifier, firstIdentifier.escapedText, 111551 /* Value */ | 1048576 /* ExportValue */, 
                    /*nodeNotFoundErrorMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    true);
                    if (name) {
                        context.tracker.trackSymbol(name, enclosingDeclaration, 111551 /* Value */);
                    }
                }