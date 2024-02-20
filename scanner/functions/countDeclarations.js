function countDeclarations(declarations) {
                const counts = { uninitialized: 0, initialized: 0 };
                for (let i = 0; i < declarations.length; i++) {
                    if (declarations[i].init === null) {
                        counts.uninitialized++;
                    }
                    else {
                        counts.initialized++;
                    }
                }
                return counts;
            }