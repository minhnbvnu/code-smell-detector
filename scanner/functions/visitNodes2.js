function visitNodes2(nodes, visitor, test, start, count) {
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
            let hasTrailingComma;
            let pos = -1;
            let end = -1;
            if (start > 0 || count < length2) {
                hasTrailingComma = nodes.hasTrailingComma && start + count === length2;
            }
            else {
                pos = nodes.pos;
                end = nodes.end;
                hasTrailingComma = nodes.hasTrailingComma;
            }
            const updated = visitArrayWorker(nodes, visitor, test, start, count);
            if (updated !== nodes) {
                const updatedArray = factory.createNodeArray(updated, hasTrailingComma);
                setTextRangePosEnd(updatedArray, pos, end);
                return updatedArray;
            }
            return nodes;
        }