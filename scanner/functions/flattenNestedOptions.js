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