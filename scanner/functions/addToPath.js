function addToPath(result, path) {
                if (Array.isArray(path)) {
                    for (j = 0, jz = path.length; j < jz; ++j) {
                        result.push(path[j]);
                    }
                }
                else {
                    result.push(path);
                }
            }