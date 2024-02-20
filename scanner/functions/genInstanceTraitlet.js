function genInstanceTraitlet(typeName, nullable, args, kwargs, tagParts) {
    const nullableStr = `allow_none=${nullable === true ? 'True' : 'False'}`;
    tagParts = tagParts.concat(['**widget_serialization']);
    const tagStr = `.tag(${tagParts.join(', ')})`;
    // allow type unions
    if (typeName instanceof Array) {
        const instances = typeName.map(function(tname) {
            return `        Instance(${tname}, ${nullableStr})`;
        });
        return `Union([\n${instances.join(',\n')}\n    ])${tagStr}`;
    }

    if (typeName.toLowerCase() === 'this') {
        return `This()${tagStr}`;
    }

    let ret = `Instance(${typeName}`;
    if (args !== undefined) {
        ret += `, args=${args}`;
    }
    if (kwargs !== undefined) {
        ret += `, kw=${kwargs}`;
    }
    ret += `, ${nullableStr})${tagStr}`;
    return ret;
}