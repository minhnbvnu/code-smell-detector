function setMipMap(mipmap, target) {
                var images = mipmap.images;
                for (var i = 0; i < images.length; ++i) {
                    if (!images[i]) {
                        return;
                    }
                    setImage(images[i], target, i);
                }
            }