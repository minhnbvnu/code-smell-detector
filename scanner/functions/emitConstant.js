function emitConstant() {
                        scope('if(', BINDING, '.buffer){', GL, '.disableVertexAttribArray(', LOCATION, ');', BINDING, '.buffer=null;', '}if(', CUTE_COMPONENTS.map(function (c, i) {
                            return BINDING + '.' + c + '!==' + CONST_COMPONENTS[i];
                        }).join('||'), '){', GL, '.vertexAttrib4f(', LOCATION, ',', CONST_COMPONENTS, ');', CUTE_COMPONENTS.map(function (c, i) {
                            return BINDING + '.' + c + '=' + CONST_COMPONENTS[i] + ';';
                        }).join(''), '}');
                    }