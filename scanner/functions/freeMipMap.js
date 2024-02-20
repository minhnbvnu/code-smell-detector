function freeMipMap(mipmap) {
                var images = mipmap.images;
                for (var i = 0; i < images.length; ++i) {
                    if (images[i]) {
                        freeImage(images[i]);
                    }
                    images[i] = null;
                }
                mipPool.push(mipmap);
            }