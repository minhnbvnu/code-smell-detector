function splatObject(env, options, name) {
                var object = options.static[name];
                if (!object || !isDynamicObject(object)) {
                    return;
                }
                var globals = env.global;
                var keys = Object.keys(object);
                var thisDep = false;
                var contextDep = false;
                var propDep = false;
                var objectRef = env.global.def('{}');
                keys.forEach(function (key) {
                    var value = object[key];
                    if (dynamic.isDynamic(value)) {
                        if (typeof value === 'function') {
                            value = object[key] = dynamic.unbox(value);
                        }
                        var deps = createDynamicDecl(value, null);
                        thisDep = thisDep || deps.thisDep;
                        propDep = propDep || deps.propDep;
                        contextDep = contextDep || deps.contextDep;
                    }
                    else {
                        globals(objectRef, '.', key, '=');
                        switch (typeof value) {
                            case 'number':
                                globals(value);
                                break;
                            case 'string':
                                globals('"', value, '"');
                                break;
                            case 'object':
                                if (Array.isArray(value)) {
                                    globals('[', value.join(), ']');
                                }
                                break;
                            default:
                                globals(env.link(value));
                                break;
                        }
                        globals(';');
                    }
                });
                function appendBlock(env, block) {
                    keys.forEach(function (key) {
                        var value = object[key];
                        if (!dynamic.isDynamic(value)) {
                            return;
                        }
                        var ref = env.invoke(block, value);
                        block(objectRef, '.', key, '=', ref, ';');
                    });
                }
                options.dynamic[name] = new dynamic.DynamicVariable(DYN_THUNK, {
                    thisDep: thisDep,
                    contextDep: contextDep,
                    propDep: propDep,
                    ref: objectRef,
                    append: appendBlock
                });
                delete options.static[name];
            }