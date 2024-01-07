constructor(device, width, height, name) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        this.texture = new Texture(device, {
            name: name,
            format: PIXELFORMAT_RGBA8,
            width: width,
            height: height,
            mipmaps: true,
            minFilter: FILTER_LINEAR_MIPMAP_LINEAR,
            magFilter: FILTER_LINEAR,
            addressU: ADDRESS_CLAMP_TO_EDGE,
            addressV: ADDRESS_CLAMP_TO_EDGE,
            levels: [this.canvas]
        });

        this.ctx = this.canvas.getContext('2d', {
            alpha: true
        });
    }