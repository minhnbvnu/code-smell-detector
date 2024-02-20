function checkGrammarClassDeclarationHeritageClauses(node) {
                let seenExtendsClause = false;
                let seenImplementsClause = false;
                if (!checkGrammarModifiers(node) && node.heritageClauses) {
                    for (const heritageClause of node.heritageClauses) {
                        if (heritageClause.token === 94 /* ExtendsKeyword */) {
                            if (seenExtendsClause) {
                                return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen);
                            }
                            if (seenImplementsClause) {
                                return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_must_precede_implements_clause);
                            }
                            if (heritageClause.types.length > 1) {
                                return grammarErrorOnFirstToken(heritageClause.types[1], Diagnostics.Classes_can_only_extend_a_single_class);
                            }
                            seenExtendsClause = true;
                        }
                        else {
                            Debug.assert(heritageClause.token === 117 /* ImplementsKeyword */);
                            if (seenImplementsClause) {
                                return grammarErrorOnFirstToken(heritageClause, Diagnostics.implements_clause_already_seen);
                            }
                            seenImplementsClause = true;
                        }
                        checkGrammarHeritageClause(heritageClause);
                    }
                }
            }