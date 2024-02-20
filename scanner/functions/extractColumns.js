function extractColumns(node) {
            var result = [];
            if (node.hasOwnProperty('length')) {
                for (var i = 0; i < node.length; i++)
                    result = result.concat(extractColumns(node[i]));
            }
            else {
                if (node.hasOwnProperty('columns'))
                    result = result.concat(extractColumns(node.columns));
                else
                    return node;
            }
            return result;
        }