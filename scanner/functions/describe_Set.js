function describe_Set(set, limit) {
    let entries = [];
    for (let e of set) {
        if (entries.length > COLLECTION_CUTOFF) {
            entries.push("[...]");
            break;
        }
        entries.push(describe(e, limit - 1));
    }
    return `Set{${entries.join(", ")}}`;
}