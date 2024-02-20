function patch_to_column(col, patch) {
        const patched = new Set();
        let patched_range = false;
        for (const [ind, val] of patch) {
            // make the single index case look like the length-3 multi-index case
            let shape;
            let item;
            let index;
            let value;
            if ((0, types_1.isArray)(ind)) {
                const [i] = ind;
                patched.add(i);
                shape = col[i].shape;
                item = col[i];
                value = val;
                // this is basically like NumPy's "newaxis", inserting an empty dimension
                // makes length 2 and 3 multi-index cases uniform, so that the same code
                // can handle both
                if (ind.length === 2) {
                    shape = [1, shape[0]];
                    index = [ind[0], 0, ind[1]];
                }
                else
                    index = ind;
            }
            else {
                if ((0, types_1.isNumber)(ind)) {
                    value = [val];
                    patched.add(ind);
                }
                else {
                    value = val;
                    patched_range = true;
                }
                index = [0, 0, ind];
                shape = [1, col.length];
                item = col;
            }
            // now this one nested loop handles all cases
            let flat_index = 0;
            const [istart, istop, istep] = slice(index[1], shape[0]);
            const [jstart, jstop, jstep] = slice(index[2], shape[1]);
            for (let i = istart; i < istop; i += istep) {
                for (let j = jstart; j < jstop; j += jstep) {
                    if (patched_range) {
                        patched.add(j);
                    }
                    item[i * shape[1] + j] = value[flat_index];
                    flat_index++;
                }
            }
        }
        return patched;
    }