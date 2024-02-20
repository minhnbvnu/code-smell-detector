function cat_v_compute(data, factors, targets, values, start, end, extra_value) {
        const N = data.length;
        for (let i = 0; i < N; i++) {
            let d = data[i];
            let key;
            if ((0, types_1.isString)(d))
                key = (0, arrayable_1.index_of)(factors, d);
            else {
                d = d.slice(start, end !== null && end !== void 0 ? end : undefined);
                if (d.length == 1)
                    key = (0, arrayable_1.index_of)(factors, d[0]);
                else
                    key = (0, arrayable_1.find_index)(factors, (x) => _cat_equals(x, d));
            }
            let value;
            if (key < 0 || key >= targets.length)
                value = extra_value;
            else
                value = targets[key];
            values[i] = value;
        }
    }