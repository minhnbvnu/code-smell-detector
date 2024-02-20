function emitDraw(env, outer, inner, args) {
                var shared = env.shared;
                var GL = shared.gl;
                var DRAW_STATE = shared.draw;
                var drawOptions = args.draw;
                function emitElements() {
                    var defn = drawOptions.elements;
                    var ELEMENTS;
                    var scope = outer;
                    if (defn) {
                        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
                            scope = inner;
                        }
                        ELEMENTS = defn.append(env, scope);
                        if (drawOptions.elementsActive) {
                            scope('if(' + ELEMENTS + ')' +
                                GL + '.bindBuffer(' + GL_ELEMENT_ARRAY_BUFFER$2 + ',' + ELEMENTS + '.buffer.buffer);');
                        }
                    }
                    else {
                        ELEMENTS = scope.def();
                        scope(ELEMENTS, '=', DRAW_STATE, '.', S_ELEMENTS, ';', 'if(', ELEMENTS, '){', GL, '.bindBuffer(', GL_ELEMENT_ARRAY_BUFFER$2, ',', ELEMENTS, '.buffer.buffer);}', 'else if(', shared.vao, '.currentVAO){', ELEMENTS, '=', env.shared.elements + '.getElements(' + shared.vao, '.currentVAO.elements);', (!extVertexArrays ? 'if(' + ELEMENTS + ')' + GL + '.bindBuffer(' + GL_ELEMENT_ARRAY_BUFFER$2 + ',' + ELEMENTS + '.buffer.buffer);' : ''), '}');
                    }
                    return ELEMENTS;
                }
                function emitCount() {
                    var defn = drawOptions.count;
                    var COUNT;
                    var scope = outer;
                    if (defn) {
                        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
                            scope = inner;
                        }
                        COUNT = defn.append(env, scope);
                        check$1.optional(function () {
                            if (defn.MISSING) {
                                env.assert(outer, 'false', 'missing vertex count');
                            }
                            if (defn.DYNAMIC) {
                                env.assert(scope, COUNT + '>=0', 'missing vertex count');
                            }
                        });
                    }
                    else {
                        COUNT = scope.def(DRAW_STATE, '.', S_COUNT);
                        check$1.optional(function () {
                            env.assert(scope, COUNT + '>=0', 'missing vertex count');
                        });
                    }
                    return COUNT;
                }
                var ELEMENTS = emitElements();
                function emitValue(name) {
                    var defn = drawOptions[name];
                    if (defn) {
                        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
                            return defn.append(env, inner);
                        }
                        else {
                            return defn.append(env, outer);
                        }
                    }
                    else {
                        return outer.def(DRAW_STATE, '.', name);
                    }
                }
                var PRIMITIVE = emitValue(S_PRIMITIVE);
                var OFFSET = emitValue(S_OFFSET);
                var COUNT = emitCount();
                if (typeof COUNT === 'number') {
                    if (COUNT === 0) {
                        return;
                    }
                }
                else {
                    inner('if(', COUNT, '){');
                    inner.exit('}');
                }
                var INSTANCES, EXT_INSTANCING;
                if (extInstancing) {
                    INSTANCES = emitValue(S_INSTANCES);
                    EXT_INSTANCING = env.instancing;
                }
                var ELEMENT_TYPE = ELEMENTS + '.type';
                var elementsStatic = drawOptions.elements && isStatic(drawOptions.elements) && !drawOptions.vaoActive;
                function emitInstancing() {
                    function drawElements() {
                        inner(EXT_INSTANCING, '.drawElementsInstancedANGLE(', [
                            PRIMITIVE,
                            COUNT,
                            ELEMENT_TYPE,
                            OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$8 + ')>>1)',
                            INSTANCES
                        ], ');');
                    }
                    function drawArrays() {
                        inner(EXT_INSTANCING, '.drawArraysInstancedANGLE(', [PRIMITIVE, OFFSET, COUNT, INSTANCES], ');');
                    }
                    if (ELEMENTS && ELEMENTS !== 'null') {
                        if (!elementsStatic) {
                            inner('if(', ELEMENTS, '){');
                            drawElements();
                            inner('}else{');
                            drawArrays();
                            inner('}');
                        }
                        else {
                            drawElements();
                        }
                    }
                    else {
                        drawArrays();
                    }
                }
                function emitRegular() {
                    function drawElements() {
                        inner(GL + '.drawElements(' + [
                            PRIMITIVE,
                            COUNT,
                            ELEMENT_TYPE,
                            OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$8 + ')>>1)'
                        ] + ');');
                    }
                    function drawArrays() {
                        inner(GL + '.drawArrays(' + [PRIMITIVE, OFFSET, COUNT] + ');');
                    }
                    if (ELEMENTS && ELEMENTS !== 'null') {
                        if (!elementsStatic) {
                            inner('if(', ELEMENTS, '){');
                            drawElements();
                            inner('}else{');
                            drawArrays();
                            inner('}');
                        }
                        else {
                            drawElements();
                        }
                    }
                    else {
                        drawArrays();
                    }
                }
                if (extInstancing && (typeof INSTANCES !== 'number' || INSTANCES >= 0)) {
                    if (typeof INSTANCES === 'string') {
                        inner('if(', INSTANCES, '>0){');
                        emitInstancing();
                        inner('}else if(', INSTANCES, '<0){');
                        emitRegular();
                        inner('}');
                    }
                    else {
                        emitInstancing();
                    }
                }
                else {
                    emitRegular();
                }
            }