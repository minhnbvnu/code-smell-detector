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