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