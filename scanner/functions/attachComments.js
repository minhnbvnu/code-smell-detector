function attachComments(tree, providedComments, tokens) {
            // At first, we should calculate extended comment ranges.
            var comments = [], comment, len, i, cursor;
            if (!tree.range) {
                throw new Error('attachComments needs range information');
            }
            // tokens array is empty, we attach comments to tree as 'leadingComments'
            if (!tokens.length) {
                if (providedComments.length) {
                    for (i = 0, len = providedComments.length; i < len; i += 1) {
                        comment = deepCopy(providedComments[i]);
                        comment.extendedRange = [0, tree.range[0]];
                        comments.push(comment);
                    }
                    tree.leadingComments = comments;
                }
                return tree;
            }
            for (i = 0, len = providedComments.length; i < len; i += 1) {
                comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
            }
            // This is based on John Freeman's implementation.
            cursor = 0;
            traverse(tree, {
                enter: function (node) {
                    var comment;
                    while (cursor < comments.length) {
                        comment = comments[cursor];
                        if (comment.extendedRange[1] > node.range[0]) {
                            break;
                        }
                        if (comment.extendedRange[1] === node.range[0]) {
                            if (!node.leadingComments) {
                                node.leadingComments = [];
                            }
                            node.leadingComments.push(comment);
                            comments.splice(cursor, 1);
                        }
                        else {
                            cursor += 1;
                        }
                    }
                    // already out of owned node
                    if (cursor === comments.length) {
                        return VisitorOption.Break;
                    }
                    if (comments[cursor].extendedRange[0] > node.range[1]) {
                        return VisitorOption.Skip;
                    }
                }
            });
            cursor = 0;
            traverse(tree, {
                leave: function (node) {
                    var comment;
                    while (cursor < comments.length) {
                        comment = comments[cursor];
                        if (node.range[1] < comment.extendedRange[0]) {
                            break;
                        }
                        if (node.range[1] === comment.extendedRange[0]) {
                            if (!node.trailingComments) {
                                node.trailingComments = [];
                            }
                            node.trailingComments.push(comment);
                            comments.splice(cursor, 1);
                        }
                        else {
                            cursor += 1;
                        }
                    }
                    // already out of owned node
                    if (cursor === comments.length) {
                        return VisitorOption.Break;
                    }
                    if (comments[cursor].extendedRange[0] > node.range[1]) {
                        return VisitorOption.Skip;
                    }
                }
            });
            return tree;
        }