function getPossibleExtractions(targetRange, context) {
            const { scopes, readsAndWrites: { functionErrorsPerScope, constantErrorsPerScope } } = getPossibleExtractionsWorker(targetRange, context);
            const extractions = scopes.map((scope, i) => {
                const functionDescriptionPart = getDescriptionForFunctionInScope(scope);
                const constantDescriptionPart = getDescriptionForConstantInScope(scope);
                const scopeDescription = isFunctionLikeDeclaration(scope) ? getDescriptionForFunctionLikeDeclaration(scope) : isClassLike(scope) ? getDescriptionForClassLikeDeclaration(scope) : getDescriptionForModuleLikeDeclaration(scope);
                let functionDescription;
                let constantDescription;
                if (scopeDescription === 1 /* Global */) {
                    functionDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [functionDescriptionPart, "global"]);
                    constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [constantDescriptionPart, "global"]);
                }
                else if (scopeDescription === 0 /* Module */) {
                    functionDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [functionDescriptionPart, "module"]);
                    constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1_scope), [constantDescriptionPart, "module"]);
                }
                else {
                    functionDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1), [functionDescriptionPart, scopeDescription]);
                    constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_1), [constantDescriptionPart, scopeDescription]);
                }
                if (i === 0 && !isClassLike(scope)) {
                    constantDescription = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Extract_to_0_in_enclosing_scope), [constantDescriptionPart]);
                }
                return {
                    functionExtraction: {
                        description: functionDescription,
                        errors: functionErrorsPerScope[i]
                    },
                    constantExtraction: {
                        description: constantDescription,
                        errors: constantErrorsPerScope[i]
                    }
                };
            });
            return extractions;
        }