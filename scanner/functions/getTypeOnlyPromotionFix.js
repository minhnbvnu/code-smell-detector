function getTypeOnlyPromotionFix(sourceFile, symbolToken, symbolName2, program) {
            const checker = program.getTypeChecker();
            const symbol = checker.resolveName(symbolName2, symbolToken, 111551 /* Value */, 
            /*excludeGlobals*/
            true);
            if (!symbol)
                return void 0;
            const typeOnlyAliasDeclaration = checker.getTypeOnlyAliasDeclaration(symbol);
            if (!typeOnlyAliasDeclaration || getSourceFileOfNode(typeOnlyAliasDeclaration) !== sourceFile)
                return void 0;
            return { kind: 4 /* PromoteTypeOnly */, typeOnlyAliasDeclaration };
        }