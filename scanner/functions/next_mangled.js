function next_mangled(scope, options) {
            let defun_scope;
            if (scopes_with_block_defuns
                && (defun_scope = scope.get_defun_scope())
                && scopes_with_block_defuns.has(defun_scope)) {
                scope = defun_scope;
            }
            var ext = scope.enclosed;
            var nth_identifier = options.nth_identifier;
            out: while (true) {
                var m = nth_identifier.get(++scope.cname);
                if (ALL_RESERVED_WORDS.has(m))
                    continue; // skip over "do"
                // https://github.com/mishoo/UglifyJS2/issues/242 -- do not
                // shadow a name reserved from mangling.
                if (options.reserved.has(m))
                    continue;
                // Functions with short names might collide with base54 output
                // and therefore cause collisions when keep_fnames is true.
                if (unmangleable_names && unmangleable_names.has(m))
                    continue out;
                // we must ensure that the mangled name does not shadow a name
                // from some parent scope that is referenced in this or in
                // inner scopes.
                for (let i = ext.length; --i >= 0;) {
                    const def = ext[i];
                    const name = def.mangled_name || (def.unmangleable(options) && def.name);
                    if (m == name)
                        continue out;
                }
                return m;
            }
        }