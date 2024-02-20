function allocType(type, n) {
                var result = null;
                switch (type) {
                    case GL_BYTE$1:
                        result = new Int8Array(alloc(n), 0, n);
                        break;
                    case GL_UNSIGNED_BYTE$2:
                        result = new Uint8Array(alloc(n), 0, n);
                        break;
                    case GL_SHORT$1:
                        result = new Int16Array(alloc(2 * n), 0, n);
                        break;
                    case GL_UNSIGNED_SHORT$1:
                        result = new Uint16Array(alloc(2 * n), 0, n);
                        break;
                    case GL_INT$1:
                        result = new Int32Array(alloc(4 * n), 0, n);
                        break;
                    case GL_UNSIGNED_INT$1:
                        result = new Uint32Array(alloc(4 * n), 0, n);
                        break;
                    case GL_FLOAT$2:
                        result = new Float32Array(alloc(4 * n), 0, n);
                        break;
                    default:
                        return null;
                }
                if (result.length !== n) {
                    return result.subarray(0, n);
                }
                return result;
            }