function copyBox(name) {
                    var defn = viewportAndScissor[name];
                    if (defn) {
                        state[name] = defn;
                    }
                }