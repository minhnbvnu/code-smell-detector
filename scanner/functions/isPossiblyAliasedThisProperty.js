function isPossiblyAliasedThisProperty(declaration, kind = getAssignmentDeclarationKind(declaration)) {
                if (kind === 4 /* ThisProperty */) {
                    return true;
                }
                if (!isInJSFile(declaration) || kind !== 5 /* Property */ || !isIdentifier(declaration.left.expression)) {
                    return false;
                }
                const name = declaration.left.expression.escapedText;
                const symbol = resolveName(declaration.left, name, 111551 /* Value */, void 0, void 0, 
                /*isUse*/
                true, 
                /*excludeGlobals*/
                true);
                return isThisInitializedDeclaration(symbol == null ? void 0 : symbol.valueDeclaration);
            }