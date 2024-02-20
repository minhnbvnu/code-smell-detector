function addLineOfJsxText(acc, trimmedLine) {
                const decoded = decodeEntities(trimmedLine);
                return acc === void 0 ? decoded : acc + " " + decoded;
            }