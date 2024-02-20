function drawElements() {
                        inner(GL + '.drawElements(' + [
                            PRIMITIVE,
                            COUNT,
                            ELEMENT_TYPE,
                            OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$8 + ')>>1)'
                        ] + ');');
                    }