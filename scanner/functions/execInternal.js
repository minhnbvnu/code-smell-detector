function execInternal(opts, statement, parentEvent, cb) {
    var tables = opts.tables, tempResources = opts.tempResources, context = opts.context,
         request = opts.request, emitter = opts.emitter;

    var selectExecTx  = opts.logEmitter.beginEvent({
            parent: parentEvent,
            name: 'select-exec',
            message: {
                line: statement.line
            },
            cb: cb});

    //
    // Pre-fill columns
    var prefill = function(column) {
        // Trim the name, but keep the column alias.
        try {
            var template = strTemplate.parse(column.name);
            column.name = template.format(opts.context, true);
        }
        catch(e) {
            // Ignore
        }
        return column;
    };
    if(_.isArray(statement.columns)) {
        _.each(statement.columns, function(column, i) {
            statement.columns[i] = prefill(column);
        });
    }
    else {
        statement.columns = prefill(statement.columns);
    }

    //
    // Analyze where conditions and fetch any dependent data
    var name, params, value, r, p, max, resource, apiTx;
    where.exec(opts, statement.whereCriteria, function(err, results) {
        var i;
        // Now fetch each resource from left to right
        _.each(statement.fromClause, function(from) {
            // Reorder results - results is an array of objects, but we just want an object
            params = {};
            for(i = 0,max = results.length; i < max; i++) {
                r = results[i];
                for(p in r) {
                    if(r.hasOwnProperty(p)) {
                        value = r[p];
                        // Resolve alias
                        if(p.indexOf(from.alias + '.') === 0) {
                            p = p.substr(from.alias.length + 1);
                        }
                        params[p] = value;
                    }
                }
            }

            name = from.name;
            // Lookup context for the source - we do this since the compiler puts the name in
            // braces to denote the source as a variable and not a table.
            if(name.indexOf("{") === 0 && name.indexOf("}") === name.length - 1) {
                name = name.substring(1, from.name.length - 1);
            }
            resource = context[name];
            if(context.hasOwnProperty(name)) { // The value may be null/undefined, and hence the check the property
                apiTx = opts.logEmitter.beginEvent({
                    parent: selectExecTx.event,
                    type: 'table',
                    name: name,
                    message: {
                        line: statement.line
                    },
                    cb: selectExecTx.cb});

                var filtered = filter.filter(resource, statement, context, from);

                // Project
                project.run('', statement, filtered, opts.context, function (projected) {
                    return apiTx.cb(null, {
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: projected
                    });
                });
            }
            else {
                // Get the resource
                resource = tempResources[from.name] || tables[from.name];
                apiTx = opts.logEmitter.beginEvent({
                        parent: selectExecTx.event,
                        type: 'table',
                        name: from.name,
                        message: {line: statement.line},
                        cb: selectExecTx.cb});

                if(!resource) {
                    return apiTx.cb('No such table ' + from.name);
                }
                var verb = resource.verb('select');
                if(!verb) {
                    return apiTx.cb('Table ' + from.name + ' does not support select');
                }

                // Limit and offset
                var limit = verb.aliases && verb.aliases.limit || 'limit';
                params[limit] = statement.limit;
                var offset = verb.aliases && verb.aliases.offset || 'offset';
                params[offset] = statement.offset;
                verb.exec({
                    name: name,
                    context: opts.context,
                    config: opts.config,
                    settings: opts.settings,
                    resource: verb.connector,
                    xformers: opts.xformers,
                    serializers: opts.serializers,
                    params: params,
                    request: request,
                    statement: statement,
                    emitter: emitter,
                    logEmitter: opts.logEmitter,
                    parentEvent: apiTx.event,
                    callback: function(err, result) {
                        if(result) {
                            context[statement.assign] = result.body;
                            emitter.emit(statement.assign, result.body);
                        }
                        return apiTx.cb(err, result);
                    },
                    cache: opts.cache
                });
            }
        });
    }, parentEvent);
}