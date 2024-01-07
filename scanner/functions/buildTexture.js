function buildTexture(device, data, format) {
            const texture = AreaLightLuts.createTexture(device, format, 64);

            texture.lock().set(data);
            texture.unlock();

            return texture;
        }