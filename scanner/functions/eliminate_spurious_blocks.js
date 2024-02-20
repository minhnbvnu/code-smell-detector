function eliminate_spurious_blocks(statements) {
                var seen_dirs = [];
                for (var i = 0; i < statements.length;) {
                    var stat = statements[i];
                    if (stat instanceof AST_BlockStatement && stat.body.every(can_be_evicted_from_block)) {
                        CHANGED = true;
                        eliminate_spurious_blocks(stat.body);
                        statements.splice(i, 1, ...stat.body);
                        i += stat.body.length;
                    }
                    else if (stat instanceof AST_EmptyStatement) {
                        CHANGED = true;
                        statements.splice(i, 1);
                    }
                    else if (stat instanceof AST_Directive) {
                        if (seen_dirs.indexOf(stat.value) < 0) {
                            i++;
                            seen_dirs.push(stat.value);
                        }
                        else {
                            CHANGED = true;
                            statements.splice(i, 1);
                        }
                    }
                    else
                        i++;
                }
            }