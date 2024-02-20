function emitBindAttribute(ATTRIBUTE, size, record) {
                    var GL = shared.gl;
                    var LOCATION = scope.def(ATTRIBUTE, '.location');
                    var BINDING = scope.def(shared.attributes, '[', LOCATION, ']');
                    var STATE = record.state;
                    var BUFFER = record.buffer;
                    var CONST_COMPONENTS = [
                        record.x,
                        record.y,
                        record.z,
                        record.w
                    ];
                    var COMMON_KEYS = [
                        'buffer',
                        'normalized',
                        'offset',
                        'stride'
                    ];
                    function emitBuffer() {
                        scope('if(!', BINDING, '.buffer){', GL, '.enableVertexAttribArray(', LOCATION, ');}');
                        var TYPE = record.type;
                        var SIZE;
                        if (!record.size) {
                            SIZE = size;
                        }
                        else {
                            SIZE = scope.def(record.size, '||', size);
                        }
                        scope('if(', BINDING, '.type!==', TYPE, '||', BINDING, '.size!==', SIZE, '||', COMMON_KEYS.map(function (key) {
                            return BINDING + '.' + key + '!==' + record[key];
                        }).join('||'), '){', GL, '.bindBuffer(', GL_ARRAY_BUFFER$2, ',', BUFFER, '.buffer);', GL, '.vertexAttribPointer(', [
                            LOCATION,
                            SIZE,
                            TYPE,
                            record.normalized,
                            record.stride,
                            record.offset
                        ], ');', BINDING, '.type=', TYPE, ';', BINDING, '.size=', SIZE, ';', COMMON_KEYS.map(function (key) {
                            return BINDING + '.' + key + '=' + record[key] + ';';
                        }).join(''), '}');
                        if (extInstancing) {
                            var DIVISOR = record.divisor;
                            scope('if(', BINDING, '.divisor!==', DIVISOR, '){', env.instancing, '.vertexAttribDivisorANGLE(', [LOCATION, DIVISOR], ');', BINDING, '.divisor=', DIVISOR, ';}');
                        }
                    }
                    function emitConstant() {
                        scope('if(', BINDING, '.buffer){', GL, '.disableVertexAttribArray(', LOCATION, ');', BINDING, '.buffer=null;', '}if(', CUTE_COMPONENTS.map(function (c, i) {
                            return BINDING + '.' + c + '!==' + CONST_COMPONENTS[i];
                        }).join('||'), '){', GL, '.vertexAttrib4f(', LOCATION, ',', CONST_COMPONENTS, ');', CUTE_COMPONENTS.map(function (c, i) {
                            return BINDING + '.' + c + '=' + CONST_COMPONENTS[i] + ';';
                        }).join(''), '}');
                    }
                    if (STATE === ATTRIB_STATE_POINTER) {
                        emitBuffer();
                    }
                    else if (STATE === ATTRIB_STATE_CONSTANT) {
                        emitConstant();
                    }
                    else {
                        scope('if(', STATE, '===', ATTRIB_STATE_POINTER, '){');
                        emitBuffer();
                        scope('}else{');
                        emitConstant();
                        scope('}');
                    }
                }