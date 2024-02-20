function getBundle(tok) {
                var result = null,
                    path = tok ? tok.split('.') : [],
                    i;

                if (path.length > 1) {
                    result = bundles;

                    for (i = 0; i < path.length - 1; i++) {
                        if (result[path[i]]) {
                            result = result[path[i]];
                        } else {
                            result = null;
                            break;
                        }
                    }
                }

                return result;
            }