function getSwitchClauseTypes(switchStatement) {
                const links = getNodeLinks(switchStatement);
                if (!links.switchTypes) {
                    links.switchTypes = [];
                    for (const clause of switchStatement.caseBlock.clauses) {
                        links.switchTypes.push(getTypeOfSwitchClause(clause));
                    }
                }
                return links.switchTypes;
            }