function findEnclosingNode(range, sourceFile) {
            return find2(sourceFile);
            function find2(n) {
                const candidate = forEachChild(n, (c) => startEndContainsRange(c.getStart(sourceFile), c.end, range) && c);
                if (candidate) {
                    const result = find2(candidate);
                    if (result) {
                        return result;
                    }
                }
                return n;
            }
        }