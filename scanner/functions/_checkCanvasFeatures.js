function _checkCanvasFeatures ()
    {

        var canvas = Phaser.CanvasPool.create(this, 6, 1);
        var context = canvas.getContext('2d');

        context.fillStyle = 'rgba(10, 20, 30, 0.5)';

        //  Draw a single pixel
        context.fillRect(0, 0, 1, 1);

        //  Get the color values
        var s1 = context.getImageData(0, 0, 1, 1);

        if (s1)
        {
            //  Plot them to x2
            context.putImageData(s1, 1, 0);

            //  Get those values
            var s2 = context.getImageData(1, 0, 1, 1);

            //  Compare and set
            device.canHandleAlpha = (
                s2.data[0] === s1.data[0] &&
                s2.data[1] === s1.data[1] &&
                s2.data[2] === s1.data[2] &&
                s2.data[3] === s1.data[3]
            );
        }

        //  Checks whether the Canvas BlendModes are supported by the current browser for drawImage.
        context.globalCompositeOperation = 'multiply';
        device.canUseMultiply = (context.globalCompositeOperation === 'multiply');

        Phaser.CanvasPool.removeByCanvas(canvas);

        PIXI.CanvasTinter.tintMethod = (device.canUseMultiply) ? PIXI.CanvasTinter.tintWithMultiply : PIXI.CanvasTinter.tintWithPerPixel;

    }