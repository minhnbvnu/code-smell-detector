function push_seq() {
                    if (!seq.length)
                        return;
                    var body = make_sequence(seq[0], seq);
                    statements[n++] = make_node(AST_SimpleStatement, body, { body: body });
                    seq = [];
                }