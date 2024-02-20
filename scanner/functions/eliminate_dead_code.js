function eliminate_dead_code(statements, compressor) {
                var has_quit;
                var self = compressor.self();
                for (var i = 0, n = 0, len = statements.length; i < len; i++) {
                    var stat = statements[i];
                    if (stat instanceof AST_LoopControl) {
                        var lct = compressor.loopcontrol_target(stat);
                        if (stat instanceof AST_Break
                            && !(lct instanceof AST_IterationStatement)
                            && loop_body(lct) === self
                            || stat instanceof AST_Continue
                                && loop_body(lct) === self) {
                            if (stat.label) {
                                remove(stat.label.thedef.references, stat);
                            }
                        }
                        else {
                            statements[n++] = stat;
                        }
                    }
                    else {
                        statements[n++] = stat;
                    }
                    if (aborts(stat)) {
                        has_quit = statements.slice(i + 1);
                        break;
                    }
                }
                statements.length = n;
                CHANGED = n != len;
                if (has_quit)
                    has_quit.forEach(function (stat) {
                        trim_unreachable_code(compressor, stat, statements);
                    });
            }