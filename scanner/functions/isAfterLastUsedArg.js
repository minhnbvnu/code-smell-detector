function isAfterLastUsedArg(variable) {
                    const def = variable.defs[0];
                    const params = context.getDeclaredVariables(def.node);
                    const posteriorParams = params.slice(params.indexOf(variable) + 1);
                    // If any used parameters occur after this parameter, do not report.
                    return !posteriorParams.some(v => v.references.length > 0 || v.eslintUsed);
                }