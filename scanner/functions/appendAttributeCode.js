function appendAttributeCode(env, block) {
                        var VALUE = env.invoke(block, dyn);
                        var shared = env.shared;
                        var constants = env.constants;
                        var IS_BUFFER_ARGS = shared.isBufferArgs;
                        var BUFFER_STATE = shared.buffer;
                        // Perform validation on attribute
                        check$1.optional(function () {
                            env.assert(block, VALUE + '&&(typeof ' + VALUE + '==="object"||typeof ' +
                                VALUE + '==="function")&&(' +
                                IS_BUFFER_ARGS + '(' + VALUE + ')||' +
                                BUFFER_STATE + '.getBuffer(' + VALUE + ')||' +
                                BUFFER_STATE + '.getBuffer(' + VALUE + '.buffer)||' +
                                IS_BUFFER_ARGS + '(' + VALUE + '.buffer)||' +
                                '("constant" in ' + VALUE +
                                '&&(typeof ' + VALUE + '.constant==="number"||' +
                                shared.isArrayLike + '(' + VALUE + '.constant))))', 'invalid dynamic attribute "' + attribute + '"');
                        });
                        // allocate names for result
                        var result = {
                            isStream: block.def(false)
                        };
                        var defaultRecord = new AttributeRecord();
                        defaultRecord.state = ATTRIB_STATE_POINTER;
                        Object.keys(defaultRecord).forEach(function (key) {
                            result[key] = block.def('' + defaultRecord[key]);
                        });
                        var BUFFER = result.buffer;
                        var TYPE = result.type;
                        block('if(', IS_BUFFER_ARGS, '(', VALUE, ')){', result.isStream, '=true;', BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$2, ',', VALUE, ');', TYPE, '=', BUFFER, '.dtype;', '}else{', BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, ');', 'if(', BUFFER, '){', TYPE, '=', BUFFER, '.dtype;', '}else if("constant" in ', VALUE, '){', result.state, '=', ATTRIB_STATE_CONSTANT, ';', 'if(typeof ' + VALUE + '.constant === "number"){', result[CUTE_COMPONENTS[0]], '=', VALUE, '.constant;', CUTE_COMPONENTS.slice(1).map(function (n) {
                            return result[n];
                        }).join('='), '=0;', '}else{', CUTE_COMPONENTS.map(function (name, i) {
                            return (result[name] + '=' + VALUE + '.constant.length>' + i +
                                '?' + VALUE + '.constant[' + i + ']:0;');
                        }).join(''), '}}else{', 'if(', IS_BUFFER_ARGS, '(', VALUE, '.buffer)){', BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$2, ',', VALUE, '.buffer);', '}else{', BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, '.buffer);', '}', TYPE, '="type" in ', VALUE, '?', constants.glTypes, '[', VALUE, '.type]:', BUFFER, '.dtype;', result.normalized, '=!!', VALUE, '.normalized;');
                        function emitReadRecord(name) {
                            block(result[name], '=', VALUE, '.', name, '|0;');
                        }
                        emitReadRecord('size');
                        emitReadRecord('offset');
                        emitReadRecord('stride');
                        emitReadRecord('divisor');
                        block('}}');
                        block.exit('if(', result.isStream, '){', BUFFER_STATE, '.destroyStream(', BUFFER, ');', '}');
                        return result;
                    }