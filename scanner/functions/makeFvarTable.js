function makeFvarTable(fvar, names) {
    var result = new table.Table('fvar', [
        {name: 'version', type: 'ULONG', value: 0x10000},
        {name: 'offsetToData', type: 'USHORT', value: 0},
        {name: 'countSizePairs', type: 'USHORT', value: 2},
        {name: 'axisCount', type: 'USHORT', value: fvar.axes.length},
        {name: 'axisSize', type: 'USHORT', value: 20},
        {name: 'instanceCount', type: 'USHORT', value: fvar.instances.length},
        {name: 'instanceSize', type: 'USHORT', value: 4 + fvar.axes.length * 4}
    ]);
    result.offsetToData = result.sizeOf();

    for (var i = 0; i < fvar.axes.length; i++) {
        result.fields.push({
            name: 'axis ' + i,
            type: 'TABLE',
            value: makeFvarAxis(fvar.axes[i], names)});
    }

    for (var j = 0; j < fvar.instances.length; j++) {
        result.fields.push({
            name: 'instance ' + j,
            type: 'TABLE',
            value: makeFvarInstance(fvar.instances[j], fvar.axes, names)
        });
    }

    return result;
}