function parseMipMapFromShape(mipmap, width, height) {
                var img = mipmap.images[0] = allocImage();
                mipmap.mipmask = 1;
                img.width = mipmap.width = width;
                img.height = mipmap.height = height;
                img.channels = mipmap.channels = 4;
            }