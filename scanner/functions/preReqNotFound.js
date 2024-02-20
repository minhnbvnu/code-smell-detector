function preReqNotFound(statement, opts, parentEvent) {
    return (statement.preRequisites || []).length > 0 && !_.all(statement.preRequisites, function (aVar) {
        var found = opts.context[aVar] != undefined && opts.context[aVar] != null;
        if (!found) {
            opts.logEmitter.emitWarning(parentEvent, "Required parameter not found in context: " + aVar);
        }
        return found;
    });
}