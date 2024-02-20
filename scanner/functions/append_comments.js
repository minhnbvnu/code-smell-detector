function append_comments(node, tail) {
                var self = this;
                var token = node.end;
                if (!token)
                    return;
                var printed_comments = self.printed_comments;
                var comments = token[tail ? "comments_before" : "comments_after"];
                if (!comments || printed_comments.has(comments))
                    return;
                if (!(node instanceof AST_Statement || comments.every((c) => !/comment[134]/.test(c.type))))
                    return;
                printed_comments.add(comments);
                var insert = OUTPUT.length();
                comments.filter(comment_filter, node).forEach(function (c, i) {
                    if (printed_comments.has(c))
                        return;
                    printed_comments.add(c);
                    need_space = false;
                    if (need_newline_indented) {
                        print("\n");
                        indent();
                        need_newline_indented = false;
                    }
                    else if (c.nlb && (i > 0 || !has_nlb())) {
                        print("\n");
                        indent();
                    }
                    else if (i > 0 || !tail) {
                        space();
                    }
                    if (/comment[134]/.test(c.type)) {
                        const value = filter_comment(c.value);
                        if (value) {
                            print("//" + value);
                        }
                        need_newline_indented = true;
                    }
                    else if (c.type == "comment2") {
                        const value = filter_comment(c.value);
                        if (value) {
                            print("/*" + value + "*/");
                        }
                        need_space = true;
                    }
                });
                if (OUTPUT.length() > insert)
                    newline_insert = insert;
            }