function getSymbolNamesToImport(sourceFile, checker, symbolToken, compilerOptions) {
            const parent2 = symbolToken.parent;
            if ((isJsxOpeningLikeElement(parent2) || isJsxClosingElement(parent2)) && parent2.tagName === symbolToken && jsxModeNeedsExplicitImport(compilerOptions.jsx)) {
                const jsxNamespace = checker.getJsxNamespace(sourceFile);
                if (needsJsxNamespaceFix(jsxNamespace, symbolToken, checker)) {
                    const needsComponentNameFix = !isIntrinsicJsxName(symbolToken.text) && !checker.resolveName(symbolToken.text, symbolToken, 111551 /* Value */, 
                    /*excludeGlobals*/
                    false);
                    return needsComponentNameFix ? [symbolToken.text, jsxNamespace] : [jsxNamespace];
                }
            }
            return [symbolToken.text];
        }