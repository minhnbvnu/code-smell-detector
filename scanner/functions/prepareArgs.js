function prepareArgs(row, where) {
    var args = [];
    _.each(where.args, function(arg) {
        if(arg.type === 'column') {
            args.push(arg.alias ? row[arg.alias] : row[arg.index]);
        }
        else {
            args.push(arg.value)
        }
    });
    return args;
}