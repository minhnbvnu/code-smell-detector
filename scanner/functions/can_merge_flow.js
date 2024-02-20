function can_merge_flow(ab) {
                    if (!ab)
                        return false;
                    for (var j = i + 1, len = statements.length; j < len; j++) {
                        var stat = statements[j];
                        if (stat instanceof AST_Const || stat instanceof AST_Let)
                            return false;
                    }
                    var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab) : null;
                    return ab instanceof AST_Return && in_lambda && is_return_void(ab.value)
                        || ab instanceof AST_Continue && self === loop_body(lct)
                        || ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct;
                }