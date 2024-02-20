function getSignatureFromCalls(calls) {
                const parameters2 = [];
                const length2 = Math.max(...calls.map((c) => c.argumentTypes.length));
                for (let i = 0; i < length2; i++) {
                    const symbol = checker.createSymbol(1 /* FunctionScopedVariable */, escapeLeadingUnderscores(`arg${i}`));
                    symbol.links.type = combineTypes(calls.map((call) => call.argumentTypes[i] || checker.getUndefinedType()));
                    if (calls.some((call) => call.argumentTypes[i] === void 0)) {
                        symbol.flags |= 16777216 /* Optional */;
                    }
                    parameters2.push(symbol);
                }
                const returnType = combineFromUsage(combineUsages(calls.map((call) => call.return_)));
                return checker.createSignature(
                /*declaration*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*thisParameter*/
                void 0, parameters2, returnType, 
                /*typePredicate*/
                void 0, length2, 0 /* None */);
            }