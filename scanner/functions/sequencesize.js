function sequencesize(statements, compressor) {
                if (statements.length < 2)
                    return;
                var seq = [], n = 0;
                function push_seq() {
                    if (!seq.length)
                        return;
                    var body = make_sequence(seq[0], seq);
                    statements[n++] = make_node(AST_SimpleStatement, body, { body: body });
                    seq = [];
                }
                for (var i = 0, len = statements.length; i < len; i++) {
                    var stat = statements[i];
                    if (stat instanceof AST_SimpleStatement) {
                        if (seq.length >= compressor.sequences_limit)
                            push_seq();
                        var body = stat.body;
                        if (seq.length > 0)
                            body = body.drop_side_effect_free(compressor);
                        if (body)
                            merge_sequence(seq, body);
                    }
                    else if (stat instanceof AST_Definitions && declarations_only(stat)
                        || stat instanceof AST_Defun) {
                        statements[n++] = stat;
                    }
                    else {
                        push_seq();
                        statements[n++] = stat;
                    }
                }
                push_seq();
                statements.length = n;
                if (n != len)
                    CHANGED = true;
            }