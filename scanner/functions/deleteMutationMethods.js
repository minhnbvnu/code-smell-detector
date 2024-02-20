function deleteMutationMethods(map) {
        Object.defineProperties(map, {
            clear: { configurable: true, value: void 0 },
            delete: { configurable: true, value: void 0 },
            set: { configurable: true, value: void 0 }
        });
    }