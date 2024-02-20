function projectOne(name, items, bag) {
    if(_.isArray(items)) {
        var arr = [];
        _.each(items, function(item) {
            arr.push(projectOne_(name, item, bag));
        })
        return arr;
    }
    else {
        return projectOne_(name, items, bag);
    }
}