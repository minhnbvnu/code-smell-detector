function is_ref_of(ref, type) {
            if (!(ref instanceof AST_SymbolRef))
                return false;
            var orig = ref.definition().orig;
            for (var i = orig.length; --i >= 0;) {
                if (orig[i] instanceof type)
                    return true;
            }
        }