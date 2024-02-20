function shouldEmitFunctionProperties(input) {
                var _a2;
                if (input.body) {
                    return true;
                }
                const overloadSignatures = (_a2 = input.symbol.declarations) == null ? void 0 : _a2.filter((decl) => isFunctionDeclaration(decl) && !decl.body);
                return !overloadSignatures || overloadSignatures.indexOf(input) === overloadSignatures.length - 1;
            }