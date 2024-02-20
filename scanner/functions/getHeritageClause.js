function getHeritageClause(clauses, kind) {
            if (clauses) {
                for (const clause of clauses) {
                    if (clause.token === kind) {
                        return clause;
                    }
                }
            }
            return void 0;
        }