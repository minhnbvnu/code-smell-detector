function computeColumnWidths(height2) {
                            const columns = fill(Array(height2), 0);
                            for (const node of nodes) {
                                columns[node.level] = Math.max(columns[node.level], node.text.length);
                            }
                            return columns;
                        }