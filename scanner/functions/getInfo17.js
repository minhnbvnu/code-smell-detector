function getInfo17(sourceFile, pos, program) {
            var _a2;
            const checker = program.getTypeChecker();
            const symbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, pos));
            if (symbol === void 0)
                return;
            const declaration = tryCast((_a2 = symbol == null ? void 0 : symbol.valueDeclaration) == null ? void 0 : _a2.parent, isVariableDeclarationList);
            if (declaration === void 0)
                return;
            const constToken = findChildOfKind(declaration, 85 /* ConstKeyword */, sourceFile);
            if (constToken === void 0)
                return;
            return { symbol, token: constToken };
        }