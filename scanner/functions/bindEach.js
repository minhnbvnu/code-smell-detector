function bindEach(nodes, bindFunction = bind) {
                if (nodes === void 0) {
                    return;
                }
                forEach(nodes, bindFunction);
            }