function createNamedToNumberedLookup(input, radix) {
        const lookup = new Map();
        const items = input.split(",");
        radix = radix !== null && radix !== void 0 ? radix : 10;
        // Map from named to numbered entities.
        for (let i = 0; i < items.length; i += 2) {
            const entity = `&${items[i + 1]};`;
            const base10 = parseInt(items[i], radix);
            lookup.set(entity, `&#${base10};`);
        }
        // FF and IE need to create a regex from hex values ie &nbsp; == \xa0
        lookup.set("\\xa0", "&#160;");
        return lookup;
    }