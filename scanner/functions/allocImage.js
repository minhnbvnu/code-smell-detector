function allocImage() {
                return imagePool.pop() || new TexImage();
            }