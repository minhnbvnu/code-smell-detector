function getSectionLevel(node) {
                        for (var i = 0; i < levelFn.length; i++) {
                            if (levelFn[i](node)) return i;
                        }
                        return -1;
                    }