function checkObject(e) {
        const t = typeof e;
        return t === "object" && e !== null || t === "function";
    }