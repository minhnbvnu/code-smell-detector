function is_tail_block(stat, parent) {
            if (parent instanceof AST_BlockStatement) return is_last_statement(parent.body, stat);
            if (parent instanceof AST_Catch) return is_last_statement(parent.body, stat);
            if (parent instanceof AST_Finally) return is_last_statement(parent.body, stat);
            if (parent instanceof AST_If) return parent.body === stat || parent.alternative === stat;
            if (parent instanceof AST_Try) return parent.bfinally ? parent.bfinally === stat : parent.bcatch === stat;
        }