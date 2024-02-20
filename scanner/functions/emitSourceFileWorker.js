function emitSourceFileWorker(node) {
                const statements = node.statements;
                pushNameGenerationScope(node);
                forEach(node.statements, generateNames);
                emitHelpers(node);
                const index = findIndex(statements, (statement) => !isPrologueDirective(statement));
                emitTripleSlashDirectivesIfNeeded(node);
                emitList(node, statements, 1 /* MultiLine */, 
                /*parenthesizerRule*/
                void 0, index === -1 ? statements.length : index);
                popNameGenerationScope(node);
            }