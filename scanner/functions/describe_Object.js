function describe_Object(value, limit) {
    let entries = [];
    for (let k in value) {
        if (!value.hasOwnProperty(k)) {
            continue;
        }
        if (entries.length > COLLECTION_CUTOFF) {
            entries.push("[...]");
            break;
        }
        let v = value[k];
        let keyDesc = describe(k, limit - 1);
        let valDesc = describe(v, limit - 1);
        entries.push(`${keyDesc}: ${valDesc}`);
    }

    let typeName = value.constructor.name;
    let prefix = typeName === {}.constructor.name ? "" : `(Type: ${typeName})`;
    return `${prefix}{${entries.join(", ")}}`;
}