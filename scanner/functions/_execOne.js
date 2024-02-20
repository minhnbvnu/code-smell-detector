function _execOne(opts, statement, parentEvent, cb) {
    if(preReqNotFound(statement, opts, parentEvent)) {
        return cb();
    }

    var obj, params, args;
    switch(statement.type) {
        case 'create' :
            create.exec(opts, statement, parentEvent, cb);
            break;
        case 'define' :
            params = _util.prepareParams(opts.context,
                     opts.request.body,
                     opts.request.routeParams,
                     opts.request.params,
                     opts.request.headers,
                     opts.request.connection,
                     {config: opts.config});

            if(statement.hasOwnProperty('object')) {
                obj = jsonfill.fill(statement.object, params);
            }
            else if(statement.udf) {
                if (statement.udf === 'require'){
                args = [];
                _.each(_.pluck(statement.args, 'value'), function(arg) {
                    args.push(jsonfill.lookup(arg, opts.context));
                });
                try {
                    obj = require('./udfs/standard.js')[statement.udf].apply(null, args);
                }
                catch(e) {
                    console.log(e.stack || e);
                    return cb(e);
                }
                }else{//assign variable using udf.
                    udf.applyAssign(opts, statement, function(err, results) {
                        if(err) {
                            cb('udf assignment failed.')
                        }
                        else {
                            if(statement.assign) {
                                obj = results;
                            }
                        }
                    });
                }
            }

            opts.context[statement.assign] = obj;
            opts.emitter.emit(statement.assign, obj)
            var ret = {
                body: obj,
                headers: {}
            };
            cb(null, ret);
            break;
        case 'select' :
            select.exec(opts, statement, parentEvent, cb);
            break;
        case 'insert' :
            insert.exec(opts, statement, parentEvent, cb);
            break;
        case 'delete' :
            delet.exec(opts, statement, parentEvent, cb);
            break;
        case 'update' :
            update.exec(opts, statement, parentEvent, cb);
            break;
        case 'show' :
            show.exec(opts, statement, parentEvent, cb);
            break;
        case 'show routes' :
            showRoutes.exec(opts, statement, parentEvent, cb);
            break;
        case 'describe':
            describe.exec(opts, statement, parentEvent, cb);
            break;
        case 'describe route':
            describeRoute.exec(opts, statement, parentEvent, cb);
            break;
        case 'ref':
            obj = opts.context[statement.ref];
            if(_.isNull(obj)) {
                cb('Unresolved reference in return');
            }
            if(statement.hasOwnProperty('object')) {
                obj = jsonfill.fill(statement.object, params);
            }
            cb(null, {
                body: obj,
                headers: {}
            });
            break;
        case 'if':
            ifelse.exec(opts, statement, parentEvent, cb);
            break;
        case 'try':
            trycatch.exec(opts, statement, parentEvent, cb);
            break;
        case 'throw':
            trycatch.throw(opts, statement, parentEvent, cb);
            break;
        case 'logic':
            logic.exec(opts, statement, parentEvent, cb);
            break;
    }
}