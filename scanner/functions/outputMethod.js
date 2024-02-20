function outputMethod(quotePreference2, signature, modifiers2, name, body2) {
                const method = createSignatureDeclarationFromSignature(171 /* MethodDeclaration */, context, quotePreference2, signature, body2, name, modifiers2, optional && !!(preserveOptional & 1 /* Method */), enclosingDeclaration, importAdder);
                if (method)
                    addClassElement(method);
            }