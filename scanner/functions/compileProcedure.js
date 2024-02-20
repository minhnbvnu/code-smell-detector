function compileProcedure(options) {
                check$1(!!options, 'invalid args to regl({...})');
                check$1.type(options, 'object', 'invalid args to regl({...})');
                function flattenNestedOptions(options) {
                    var result = extend({}, options);
                    delete result.uniforms;
                    delete result.attributes;
                    delete result.context;
                    delete result.vao;
                    if ('stencil' in result && result.stencil.op) {
                        result.stencil.opBack = result.stencil.opFront = result.stencil.op;
                        delete result.stencil.op;
                    }
                    function merge(name) {
                        if (name in result) {
                            var child = result[name];
                            delete result[name];
                            Object.keys(child).forEach(function (prop) {
                                result[name + '.' + prop] = child[prop];
                            });
                        }
                    }
                    merge('blend');
                    merge('depth');
                    merge('cull');
                    merge('stencil');
                    merge('polygonOffset');
                    merge('scissor');
                    merge('sample');
                    if ('vao' in options) {
                        result.vao = options.vao;
                    }
                    return result;
                }
                function separateDynamic(object, useArrays) {
                    var staticItems = {};
                    var dynamicItems = {};
                    Object.keys(object).forEach(function (option) {
                        var value = object[option];
                        if (dynamic.isDynamic(value)) {
                            dynamicItems[option] = dynamic.unbox(value, option);
                            return;
                        }
                        else if (useArrays && Array.isArray(value)) {
                            for (var i = 0; i < value.length; ++i) {
                                if (dynamic.isDynamic(value[i])) {
                                    dynamicItems[option] = dynamic.unbox(value, option);
                                    return;
                                }
                            }
                        }
                        staticItems[option] = value;
                    });
                    return {
                        dynamic: dynamicItems,
                        static: staticItems
                    };
                }
                // Treat context variables separate from other dynamic variables
                var context = separateDynamic(options.context || {}, true);
                var uniforms = separateDynamic(options.uniforms || {}, true);
                var attributes = separateDynamic(options.attributes || {}, false);
                var opts = separateDynamic(flattenNestedOptions(options), false);
                var stats$$1 = {
                    gpuTime: 0.0,
                    cpuTime: 0.0,
                    count: 0
                };
                var compiled = core.compile(opts, attributes, uniforms, context, stats$$1);
                var draw = compiled.draw;
                var batch = compiled.batch;
                var scope = compiled.scope;
                // FIXME: we should modify code generation for batch commands so this
                // isn't necessary
                var EMPTY_ARRAY = [];
                function reserve(count) {
                    while (EMPTY_ARRAY.length < count) {
                        EMPTY_ARRAY.push(null);
                    }
                    return EMPTY_ARRAY;
                }
                function REGLCommand(args, body) {
                    var i;
                    if (contextLost) {
                        check$1.raise('context lost');
                    }
                    if (typeof args === 'function') {
                        return scope.call(this, null, args, 0);
                    }
                    else if (typeof body === 'function') {
                        if (typeof args === 'number') {
                            for (i = 0; i < args; ++i) {
                                scope.call(this, null, body, i);
                            }
                        }
                        else if (Array.isArray(args)) {
                            for (i = 0; i < args.length; ++i) {
                                scope.call(this, args[i], body, i);
                            }
                        }
                        else {
                            return scope.call(this, args, body, 0);
                        }
                    }
                    else if (typeof args === 'number') {
                        if (args > 0) {
                            return batch.call(this, reserve(args | 0), args | 0);
                        }
                    }
                    else if (Array.isArray(args)) {
                        if (args.length) {
                            return batch.call(this, args, args.length);
                        }
                    }
                    else {
                        return draw.call(this, args);
                    }
                }
                return extend(REGLCommand, {
                    stats: stats$$1,
                    destroy: function () {
                        compiled.destroy();
                    }
                });
            }