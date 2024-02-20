function freezeDeeply(x) {
        if (typeof x === "object" && x !== null) {
            if (Array.isArray(x)) {
                x.forEach(freezeDeeply);
            }
            else {
                for (const key in x) {
                    if (key !== "parent" && hasOwnProperty(x, key)) {
                        freezeDeeply(x[key]);
                    }
                }
            }
            Object.freeze(x);
        }
    }