function getTextureSize(format, type, width, height, isMipmap, isCube) {
            var s;
            if (typeof FORMAT_SIZES_SPECIAL[format] !== 'undefined') {
                // we have a special array for dealing with weird color formats such as RGB5A1
                s = FORMAT_SIZES_SPECIAL[format];
            }
            else {
                s = FORMAT_CHANNELS[format] * TYPE_SIZES[type];
            }
            if (isCube) {
                s *= 6;
            }
            if (isMipmap) {
                // compute the total size of all the mipmaps.
                var total = 0;
                var w = width;
                while (w >= 1) {
                    // we can only use mipmaps on a square image,
                    // so we can simply use the width and ignore the height:
                    total += s * w * w;
                    w /= 2;
                }
                return total;
            }
            else {
                return s * width * height;
            }
        }