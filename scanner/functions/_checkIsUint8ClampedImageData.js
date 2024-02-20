function _checkIsUint8ClampedImageData () {

        if (Uint8ClampedArray === undefined)
        {
            return false;
        }

        var elem = PIXI.CanvasPool.create(this, 1, 1);
        var ctx = elem.getContext('2d');

        if (!ctx)
        {
            return false;
        }

        var image = ctx.createImageData(1, 1);

        PIXI.CanvasPool.remove(this);

        return image.data instanceof Uint8ClampedArray;

    }