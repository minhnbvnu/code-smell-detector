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