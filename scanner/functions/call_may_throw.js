function call_may_throw(exp, compressor) {
            if (exp.may_throw(compressor)) return true;
            if (exp instanceof AST_SymbolRef) exp = exp.fixed_value();
            if (!(exp instanceof AST_Lambda)) return true;
            if (any(exp.argnames, compressor)) return true;
            if (any(exp.body, compressor)) return true;
            return is_arrow(exp) && exp.value && exp.value.may_throw(compressor);
        }