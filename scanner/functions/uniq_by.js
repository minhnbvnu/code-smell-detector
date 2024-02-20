function uniq_by(array, key) {
        const result = [];
        const seen = [];
        for (const value of array) {
            const computed = key(value);
            if (!(0, arrayable_1.includes)(seen, computed)) {
                seen.push(computed);
                result.push(value);
            }
        }
        return result;
    }