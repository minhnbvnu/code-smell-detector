function _fromJson_InitialState(json) {
    let {init} = json;
    if (init === undefined) {
        return new Map();
    }

    if (!Array.isArray(init)) {
        throw new DetailedError('Initial states must be an array.', {json});
    }

    let result = new Map();
    for (let i = 0; i < init.length; i++) {
        let v = init[i];
        if (v === 0) {
            // 0 is the default. Don't need to do anything.
        } else if (v === 1) {
            result.set(i, '1');
        } else if (INITIAL_STATES_TO_GATES.has(v)) {
            result.set(i, v);
        } else {
            throw new DetailedError('Unrecognized initial state key.', {v, json});
        }
    }

    return result;
}