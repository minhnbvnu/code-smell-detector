function removeFromEach(types, flag) {
                for (let i = 0; i < types.length; i++) {
                    types[i] = filterType(types[i], (t) => !(t.flags & flag));
                }
            }