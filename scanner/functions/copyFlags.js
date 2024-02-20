function copyFlags(result, other) {
                result.internalformat = other.internalformat;
                result.format = other.format;
                result.type = other.type;
                result.compressed = other.compressed;
                result.premultiplyAlpha = other.premultiplyAlpha;
                result.flipY = other.flipY;
                result.unpackAlignment = other.unpackAlignment;
                result.colorSpace = other.colorSpace;
                result.width = other.width;
                result.height = other.height;
                result.channels = other.channels;
            }