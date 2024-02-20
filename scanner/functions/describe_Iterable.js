function describe_Iterable(seq, limit) {
    let entries = [];
    for (let e of seq) {
        if (entries.length > COLLECTION_CUTOFF) {
            entries.push("[...]");
            break;
        }
        entries.push(describe(e, limit - 1));
    }
    let prefix = Array.isArray(seq) ? "" : seq.constructor.name;
    return `${prefix}[${entries.join(", ")}]`;
}