function freeImage(image) {
                if (image.needsFree) {
                    pool.freeType(image.data);
                }
                TexImage.call(image);
                imagePool.push(image);
            }