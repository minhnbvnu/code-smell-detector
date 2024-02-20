function wrapTrackingFunction(range, loc) {

        return function (parseFunction) {

            function isBinary(node) {
                return node.type === Syntax.LogicalExpression ||
                    node.type === Syntax.BinaryExpression;
            }

            function visit(node) {
                if (isBinary(node.left)) {
                    visit(node.left);
                }
                if (isBinary(node.right)) {
                    visit(node.right);
                }

                if (range && typeof node.range === 'undefined') {
                    node.range = [node.left.range[0], node.right.range[1]];
                }
                if (loc && typeof node.loc === 'undefined') {
                    node.loc = {
                        start: node.left.loc.start,
                        end: node.right.loc.end
                    };
                }
            }

            return function () {
                var node, rangeInfo, locInfo;

                skipComment();
                rangeInfo = [index, 0];
                locInfo = {
                    start: {
                        line: lineNumber,
                        column: index - lineStart
                    }
                };

                node = parseFunction.apply(null, arguments);
                if (typeof node !== 'undefined') {

                    if (range) {
                        rangeInfo[1] = index;
                        node.range = rangeInfo;
                    }

                    if (loc) {
                        locInfo.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        node.loc = locInfo;
                    }

                    if (isBinary(node)) {
                        visit(node);
                    }

                    if (node.type === Syntax.MemberExpression) {
                        if (typeof node.object.range !== 'undefined') {
                            node.range[0] = node.object.range[0];
                        }
                        if (typeof node.object.loc !== 'undefined') {
                            node.loc.start = node.object.loc.start;
                        }
                    }
                    return node;
                }
            };

        };
    }