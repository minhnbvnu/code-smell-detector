function narrowTypeBySwitchOptionalChainContainment(type, switchStatement, clauseStart, clauseEnd, clauseCheck) {
                    const everyClauseChecks = clauseStart !== clauseEnd && every(getSwitchClauseTypes(switchStatement).slice(clauseStart, clauseEnd), clauseCheck);
                    return everyClauseChecks ? getTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type;
                }