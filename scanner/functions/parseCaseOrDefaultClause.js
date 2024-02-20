function parseCaseOrDefaultClause() {
                        return token() === 82 /* CaseKeyword */ ? parseCaseClause() : parseDefaultClause();
                    }