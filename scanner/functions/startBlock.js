function startBlock() {
                blockStack.push({
                    let: { initialized: false, uninitialized: false },
                    const: { initialized: false, uninitialized: false }
                });
            }