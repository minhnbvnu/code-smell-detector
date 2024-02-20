function break_cont(type) {
                var label = null, ldef;
                if (!can_insert_semicolon()) {
                    label = as_symbol(AST_LabelRef, true);
                }
                if (label != null) {
                    ldef = S.labels.find((l) => l.name === label.name);
                    if (!ldef)
                        croak("Undefined label " + label.name);
                    label.thedef = ldef;
                }
                else if (S.in_loop == 0)
                    croak(type.TYPE + " not inside a loop or switch");
                semicolon();
                var stat = new type({ label: label });
                if (ldef)
                    ldef.references.push(stat);
                return stat;
            }