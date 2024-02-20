function allocMipMap() {
                var result = mipPool.pop() || new MipMap();
                TexFlags.call(result);
                result.mipmask = 0;
                for (var i = 0; i < 16; ++i) {
                    result.images[i] = null;
                }
                return result;
            }