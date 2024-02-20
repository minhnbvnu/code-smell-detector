function eachUnreachableRange(node, cb) {
            if (isStatement(node) && isExecutableStatement(node) && isBlock(node.parent)) {
                const { statements } = node.parent;
                const slice = sliceAfter(statements, node);
                getRangesWhere(slice, isExecutableStatement, (start, afterEnd) => cb(slice[start], slice[afterEnd - 1]));
            }
            else {
                cb(node, node);
            }
        }