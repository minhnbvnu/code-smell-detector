function _convert_date_list(value) {
        const result = [];
        for (const item of value) {
            if ((0, types_1.isString)(item))
                result.push(item);
            else {
                const [from, to] = item;
                result.push({ from, to });
            }
        }
        return result;
    }