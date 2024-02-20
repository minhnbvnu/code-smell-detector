function checkGrammarInterfaceDeclaration(node) {
                let seenExtendsClause = false;
                if (node.heritageClauses) {
                    for (const heritageClause of node.heritageClauses) {
                        if (heritageClause.token === 94 /* ExtendsKeyword */) {
                            if (seenExtendsClause) {
                                return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen);
                            }
                            seenExtendsClause = true;
                        }
                        else {
                            Debug.assert(heritageClause.token === 117 /* ImplementsKeyword */);
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.Interface_declaration_cannot_have_implements_clause);
                        }
                        checkGrammarHeritageClause(heritageClause);
                    }
                }
                return false;
            }