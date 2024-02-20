function parseHeritageClauses() {
                        if (isHeritageClause2()) {
                            return parseList(22 /* HeritageClauses */, parseHeritageClause);
                        }
                        return void 0;
                    }