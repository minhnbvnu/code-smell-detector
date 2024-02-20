function mark_export(def, level) {
                if (in_destructuring) {
                    var i = 0;
                    do {
                        level++;
                    } while (tw.parent(i++) !== in_destructuring);
                }
                var node = tw.parent(level);
                if (def.export = node instanceof AST_Export ? MASK_EXPORT_DONT_MANGLE : 0) {
                    var exported = node.exported_definition;
                    if ((exported instanceof AST_Defun || exported instanceof AST_DefClass) && node.is_default) {
                        def.export = MASK_EXPORT_WANT_MANGLE;
                    }
                }
            }