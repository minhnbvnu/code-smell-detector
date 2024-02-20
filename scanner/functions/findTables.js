function findTables(statement) {
    var tables = [];
    tables = tables.concat(findTablesFromStatement(statement));
    _.each(statement.dependsOn, function(dependency) {
        tables = tables.concat(findTables(dependency))
    });
    return tables;
}