function getPropertyDescriptor(object, name) {
        let x = object;
        while ((typeof x === "object" || typeof x === "function") && x !== null) {
            const d = Object.getOwnPropertyDescriptor(x, name);
            if (d) {
                return d;
            }
            x = Object.getPrototypeOf(x);
        }
        return null;
    }