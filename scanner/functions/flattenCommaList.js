function flattenCommaList(node) {
            const expressions = [];
            flattenCommaListWorker(node, expressions);
            return expressions;
        }