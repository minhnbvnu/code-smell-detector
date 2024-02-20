function narrowTypeBySwitchOnTypeOf(type, switchStatement, clauseStart, clauseEnd) {
                    const witnesses = getSwitchClauseTypeOfWitnesses(switchStatement);
                    if (!witnesses) {
                        return type;
                    }
                    const defaultIndex = findIndex(switchStatement.caseBlock.clauses, (clause) => clause.kind === 293 /* DefaultClause */);
                    const hasDefaultClause = clauseStart === clauseEnd || defaultIndex >= clauseStart && defaultIndex < clauseEnd;
                    if (hasDefaultClause) {
                        const notEqualFacts = getNotEqualFactsFromTypeofSwitch(clauseStart, clauseEnd, witnesses);
                        return filterType(type, (t) => (getTypeFacts(t) & notEqualFacts) === notEqualFacts);
                    }
                    const clauseWitnesses = witnesses.slice(clauseStart, clauseEnd);
                    return getUnionType(map(clauseWitnesses, (text) => text ? narrowTypeByTypeName(type, text) : neverType));
                }