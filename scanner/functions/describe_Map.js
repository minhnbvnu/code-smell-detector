function describe_Map(map, limit) {
    let entries = [];
    for (let [k, v] of map.entries()) {
        if (entries.length > COLLECTION_CUTOFF) {
            entries.push("[...]");
            break;
        }
        //noinspection JSUnusedAssignment
        let keyDesc = describe(k, limit - 1);
        //noinspection JSUnusedAssignment
        let valDesc = describe(v, limit - 1);
        entries.push(`${keyDesc}: ${valDesc}`);
    }
    return `Map{${entries.join(", ")}}`;
}