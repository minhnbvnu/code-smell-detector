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