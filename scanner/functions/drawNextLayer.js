function drawNextLayer(storages) {
    // Dithering algorithm to select the next layer
    // see https://gamedev.stackexchange.com/a/95696 for more details
    let sum = 0;
    let selected;
    let max;
    for (const item of storages) {
        const st = item[1];
        if (st.q.length > 0) {
            sum += st.priority;
            st.accumulator += st.priority;
            // Select the biggest accumulator
            if (!selected || st.accumulator > max) {
                selected = st;
                max = st.accumulator;
            }
        }
    }

    if (selected) {
        selected.accumulator -= sum;
        return selected.q;
    }
}