function computeLevel(node) {
                            if (node.level !== -1) {
                                return node.level;
                            }
                            let level = 0;
                            for (const parent2 of getParents(node)) {
                                level = Math.max(level, computeLevel(parent2) + 1);
                            }
                            return node.level = level;
                        }