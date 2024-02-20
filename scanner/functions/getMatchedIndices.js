function getMatchedIndices(elements, filePath) {
        const indices = [];
        for (let i = elements.length - 1; i >= 0; --i) {
            const element = elements[i];
            if (!element.criteria || (filePath && element.criteria.test(filePath))) {
                indices.push(i);
            }
        }
        return indices;
    }