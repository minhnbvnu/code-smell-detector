function last_of(predicate) {
                var block = self, stat, level = 0;
                do {
                    do {
                        if (predicate(block)) return true;
                        block = compressor.parent(level++);
                    } while (block instanceof AST_If && (stat = block));
                } while ((block instanceof AST_BlockStatement || block instanceof AST_Scope)
                    && is_last_statement(block.body, stat));
            }