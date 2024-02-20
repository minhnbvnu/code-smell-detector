function emitAttributes(env, scope, args, attributes, filter) {
                var shared = env.shared;
                function typeLength(x) {
                    switch (x) {
                        case GL_FLOAT_VEC2:
                        case GL_INT_VEC2:
                        case GL_BOOL_VEC2:
                            return 2;
                        case GL_FLOAT_VEC3:
                        case GL_INT_VEC3:
                        case GL_BOOL_VEC3:
                            return 3;
                        case GL_FLOAT_VEC4:
                        case GL_INT_VEC4:
                        case GL_BOOL_VEC4:
                            return 4;
                        default:
                            return 1;
                    }
                }
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
                attributes.forEach(function (attribute) {
                    var name = attribute.name;
                    var arg = args.attributes[name];
                    var record;
                    if (arg) {
                        if (!filter(arg)) {
                            return;
                        }
                        record = arg.append(env, scope);
                    }
                    else {
                        if (!filter(SCOPE_DECL)) {
                            return;
                        }
                        var scopeAttrib = env.scopeAttrib(name);
                        check$1.optional(function () {
                            env.assert(scope, scopeAttrib + '.state', 'missing attribute ' + name);
                        });
                        record = {};
                        Object.keys(new AttributeRecord()).forEach(function (key) {
                            record[key] = scope.def(scopeAttrib, '.', key);
                        });
                    }
                    emitBindAttribute(env.link(attribute), typeLength(attribute.info.type), record);
                });
            }