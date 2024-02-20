function findTablesFromStatement(statement) {
    var arr;
    switch(statement.type) {
        case 'select' :
            arr = statement.fromClause;
            break;
        case 'insert' :
        case 'delete' :
            arr = [statement.source];
            break;
        case 'update' :
            // TODO
            break;
    }

    var tables =  _.filter(_.pluck(arr,'name'), function(entry) {
        return entry && !(entry.indexOf("{") === 0);
    });
    return tables;
}