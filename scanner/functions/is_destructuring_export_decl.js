function is_destructuring_export_decl(compressor) {
                var ancestors = [/^VarDef$/, /^(Const|Let|Var)$/, /^Export$/];
                for (var a = 0, p = 0, len = ancestors.length; a < len; p++) {
                    var parent = compressor.parent(p);
                    if (!parent)
                        return false;
                    if (a === 0 && parent.TYPE == "Destructuring")
                        continue;
                    if (!ancestors[a].test(parent.TYPE)) {
                        return false;
                    }
                    a++;
                }
                return true;
            }