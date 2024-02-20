function makeStringIndex(strings) {
    var t = new table.Table('String INDEX', [
        {name: 'strings', type: 'INDEX', value: []}
    ]);
    t.strings = [];
    for (var i = 0; i < strings.length; i += 1) {
        t.strings.push({name: 'string_' + i, type: 'STRING', value: strings[i]});
    }

    return t;
}