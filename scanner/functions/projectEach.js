function projectEach(item, columns, bag) {
    // If columns have aliases, each row in the result set will be an object. If not, an array.
    var holder = columns[0].alias ? {} : [], name, flatten, obj;
    _.each(columns, function(column) {
        // Flatten results as the selector may include '..'
        name = column.name.trim();
        flatten = name.indexOf('..') >= 0;
        obj = jsonPath.eval(item, name, {flatten: flatten, sandbox: bag});
        if(obj == false) obj = undefined;
        if(obj && _.isArray(obj) && obj.length == 1) {
            obj = obj[0];
        }
        if(column.alias) {
            holder[column.alias] = obj;
        }
        else {
            holder.push(obj);
        }
    });
    if(holder.length === 1) {
        return holder[0];
    }
    else {
        return holder;
    }
}