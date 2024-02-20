function map_one_level(factors, padding, offset = 0) {
        const mapping = new Map();
        for (let i = 0; i < factors.length; i++) {
            const factor = factors[i];
            if (!mapping.has(factor))
                mapping.set(factor, { value: 0.5 + i * (1 + padding) + offset });
            else
                throw new Error(`duplicate factor or subfactor: ${factor}`);
        }
        return [mapping, (factors.length - 1) * padding];
    }