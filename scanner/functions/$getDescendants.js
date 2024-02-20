function $getDescendants(e, output) {
    if (e) {
        output.push(e);
        if (e.child_array) {
            for (let i = 0; i < e.child_array.length; ++i) {
                $getDescendants(e.child_array[i], output);
            }
        }
    }
}