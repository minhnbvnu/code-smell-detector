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