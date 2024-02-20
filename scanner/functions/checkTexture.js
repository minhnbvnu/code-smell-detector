function checkTexture(target) {
                            check$1(!Array.isArray(VALUE), 'must not specify a value type');
                            emitCheck('typeof ' + VALUE + '==="function"&&' +
                                VALUE + '._reglType==="texture' +
                                (target === GL_TEXTURE_2D$3 ? '2d' : 'Cube') + '"', 'invalid texture type', env.commandStr);
                        }