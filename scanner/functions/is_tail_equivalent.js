function is_tail_equivalent(consequent, alternative) {
            if (consequent.TYPE != alternative.TYPE) return;
            if (consequent.optional != alternative.optional) return;
            if (consequent instanceof AST_Call) {
                if (arg_diff(consequent, alternative) != -1) return;
                return consequent.TYPE != "Call"
                    || !(consequent.expression instanceof AST_PropAccess
                        || alternative.expression instanceof AST_PropAccess)
                    || is_tail_equivalent(consequent.expression, alternative.expression);
            }
            if (!(consequent instanceof AST_PropAccess)) return;
            var p = consequent.property;
            var q = alternative.property;
            return (p instanceof AST_Node ? p.equivalent_to(q) : p == q)
                && !(consequent.expression instanceof AST_Super || alternative.expression instanceof AST_Super);
        }