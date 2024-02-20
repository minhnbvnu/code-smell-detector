function ensureParameter(p, modifierMask, type) {
                let oldDiag;
                if (!suppressNewDiagnosticContexts) {
                    oldDiag = getSymbolAccessibilityDiagnostic;
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p);
                }
                const newParam = factory2.updateParameterDeclaration(p, maskModifiers(p, modifierMask), p.dotDotDotToken, filterBindingPatternInitializersAndRenamings(p.name), resolver.isOptionalParameter(p) ? p.questionToken || factory2.createToken(57 /* QuestionToken */) : void 0, ensureType(p, type || p.type, 
                /*ignorePrivate*/
                true), 
                // Ignore private param props, since this type is going straight back into a param
                ensureNoInitializer(p));
                if (!suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                return newParam;
            }