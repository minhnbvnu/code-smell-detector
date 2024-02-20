function createBinder2(overloads, binder2) {
            return (args) => {
                for (let i = 0; hasProperty(overloads, `${i}`) && hasProperty(binder2, `${i}`); i++) {
                    const fn = binder2[i];
                    if (fn(args)) {
                        return i;
                    }
                }
            };
        }