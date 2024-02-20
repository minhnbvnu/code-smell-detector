function getColumnsInDepth(node, depth, current) {
            var columns = [];
            current = current || 0;
            if (depth == current) {
                if (node.length)
                    node.forEach(function (n) {
                        if (n.columns)
                            n.extractColumns = function () {
                                return extractColumns(n);
                            };
                    });
                return node;
            }
            else
                for (var i in node)
                    if (node[i].columns) {
                        columns = columns.concat(getColumnsInDepth(node[i].columns, depth, current + 1));
                    }
            return columns;
        }