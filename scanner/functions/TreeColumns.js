function TreeColumns(treeColumns) {
        var columnsById = {};
        function init() {
            mapToId(treeColumns);
        }
        function mapToId(columns) {
            columns
                .forEach(function (column) {
                columnsById[column.id] = column;
                if (column.columns)
                    mapToId(column.columns);
            });
        }
        function filter(node, condition) {
            return node.filter(function (column) {
                var valid = condition.call(column);
                if (valid && column.columns)
                    column.columns = filter(column.columns, condition);
                return valid && (!column.columns || column.columns.length);
            });
        }
        function sort(columns, grid) {
            columns
                .sort(function (a, b) {
                var indexA = getOrDefault(grid.getColumnIndex(a.id)), indexB = getOrDefault(grid.getColumnIndex(b.id));
                return indexA - indexB;
            })
                .forEach(function (column) {
                if (column.columns)
                    sort(column.columns, grid);
            });
        }
        function getOrDefault(value) {
            return typeof value === 'undefined' ? -1 : value;
        }
        function getDepth(node) {
            if (node.length)
                for (var i in node)
                    return getDepth(node[i]);
            else if (node.columns)
                return 1 + getDepth(node.columns);
            else
                return 1;
        }
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
        function cloneTreeColumns() {
            return $.extend(true, [], treeColumns);
        }
        init();
        this.hasDepth = function () {
            for (var i in treeColumns)
                if (treeColumns[i].hasOwnProperty('columns'))
                    return true;
            return false;
        };
        this.getTreeColumns = function () {
            return treeColumns;
        };
        this.extractColumns = function () {
            return this.hasDepth() ? extractColumns(treeColumns) : treeColumns;
        };
        this.getDepth = function () {
            return getDepth(treeColumns);
        };
        this.getColumnsInDepth = function (depth) {
            return getColumnsInDepth(treeColumns, depth);
        };
        this.getColumnsInGroup = function (groups) {
            return extractColumns(groups);
        };
        this.visibleColumns = function () {
            return filter(cloneTreeColumns(), function () {
                return this.visible;
            });
        };
        this.filter = function (condition) {
            return filter(cloneTreeColumns(), condition);
        };
        this.reOrder = function (grid) {
            return sort(treeColumns, grid);
        };
        this.getById = function (id) {
            return columnsById[id];
        };
        this.getInIds = function (ids) {
            return ids.map(function (id) {
                return columnsById[id];
            });
        };
    }