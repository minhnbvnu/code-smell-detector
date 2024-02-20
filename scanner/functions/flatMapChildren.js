function flatMapChildren(node, cb) {
                        const result = [];
                        node.forEachChild((child) => {
                            const value = cb(child);
                            if (value !== void 0) {
                                result.push(...toArray(value));
                            }
                        });
                        return result;
                    }