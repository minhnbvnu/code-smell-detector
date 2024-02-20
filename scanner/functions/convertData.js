function convertData(result, data) {
            var n = data.length;
            switch (result.type) {
                case GL_UNSIGNED_BYTE$5:
                case GL_UNSIGNED_SHORT$3:
                case GL_UNSIGNED_INT$3:
                case GL_FLOAT$4:
                    var converted = pool.allocType(result.type, n);
                    converted.set(data);
                    result.data = converted;
                    break;
                case GL_HALF_FLOAT_OES$1:
                    result.data = convertToHalfFloat(data);
                    break;
                default:
                    check$1.raise('unsupported texture type, must specify a typed array');
            }
        }