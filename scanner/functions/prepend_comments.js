function prepend_comments(node) {
                var self = this;
                var start = node.start;
                if (!start)
                    return;
                var printed_comments = self.printed_comments;
                // There cannot be a newline between return and its value.
                const return_with_value = node instanceof AST_Exit && node.value;
                if (start.comments_before
                    && printed_comments.has(start.comments_before)) {
                    if (return_with_value) {
                        start.comments_before = [];
                    }
                    else {
                        return;
                    }
                }
                var comments = start.comments_before;
                if (!comments) {
                    comments = start.comments_before = [];
                }
                printed_comments.add(comments);
                if (return_with_value) {
                    var tw = new TreeWalker(function (node) {
                        var parent = tw.parent();
                        if (parent instanceof AST_Exit
                            || parent instanceof AST_Binary && parent.left === node
                            || parent.TYPE == "Call" && parent.expression === node
                            || parent instanceof AST_Conditional && parent.condition === node
                            || parent instanceof AST_Dot && parent.expression === node
                            || parent instanceof AST_Sequence && parent.expressions[0] === node
                            || parent instanceof AST_Sub && parent.expression === node
                            || parent instanceof AST_UnaryPostfix) {
                            if (!node.start)
                                return;
                            var text = node.start.comments_before;
                            if (text && !printed_comments.has(text)) {
                                printed_comments.add(text);
                                comments = comments.concat(text);
                            }
                        }
                        else {
                            return true;
                        }
                    });
                    tw.push(node);
                    node.value.walk(tw);
                }
                if (current_pos == 0) {
                    if (comments.length > 0 && options.shebang && comments[0].type === "comment5"
                        && !printed_comments.has(comments[0])) {
                        print("#!" + comments.shift().value + "\n");
                        indent();
                    }
                    var preamble = options.preamble;
                    if (preamble) {
                        print(preamble.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g, "\n"));
                    }
                }
                comments = comments.filter(comment_filter, node).filter(c => !printed_comments.has(c));
                if (comments.length == 0)
                    return;
                var last_nlb = has_nlb();
                comments.forEach(function (c, i) {
                    printed_comments.add(c);
                    if (!last_nlb) {
                        if (c.nlb) {
                            print("\n");
                            indent();
                            last_nlb = true;
                        }
                        else if (i > 0) {
                            space();
                        }
                    }
                    if (/comment[134]/.test(c.type)) {
                        var value = filter_comment(c.value);
                        if (value) {
                            print("//" + value + "\n");
                            indent();
                        }
                        last_nlb = true;
                    }
                    else if (c.type == "comment2") {
                        var value = filter_comment(c.value);
                        if (value) {
                            print("/*" + value + "*/");
                        }
                        last_nlb = false;
                    }
                });
                if (!last_nlb) {
                    if (start.nlb) {
                        print("\n");
                        indent();
                    }
                    else {
                        space();
                    }
                }
            }