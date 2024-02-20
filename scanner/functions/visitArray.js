function visitArray(nodes, visitor, test, start, count) {
            if (nodes === void 0) {
                return nodes;
            }
            const length2 = nodes.length;
            if (start === void 0 || start < 0) {
                start = 0;
            }
            if (count === void 0 || count > length2 - start) {
                count = length2 - start;
            }
            return visitArrayWorker(nodes, visitor, test, start, count);
        }