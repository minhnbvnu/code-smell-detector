function pixelateCanvas(inCanvas, inCtx) {
    // so - smaller canvases also need to scale down less, because they get too small to render anything
    //just gonna use a map function for now

    var biggerDimension = Math.max(inCanvas.width, inCanvas.height);

    var size = scale(biggerDimension, 10, 2500, 0.1, 0.015);
    w = inCanvas.width * size;
    h = inCanvas.height * size;

    offscreenCanvas.width = inCanvas.width; //w;
    offscreenCanvas.height = inCanvas.height; //h;

    offscreenCtx.drawImage(inCanvas, 0, 0, w, h);
    offscreenCtx.scale(w*size,h*size);
    
    inCtx.save();

    // turn off image aliasing for a pixely look - currently off
    //inCtx.msImageSmoothingEnabled = false;
    //inCtx.mozImageSmoothingEnabled = false;
    //inCtx.webkitImageSmoothingEnabled = false;
    //inCtx.imageSmoothingEnabled = false;

    // enlarge the minimized image to full size and draw to main canvas
    inCtx.drawImage(
        offscreenCanvas,
        0,
        0,
        w,
        h,
        0,
        0,
        inCanvas.width,
        inCanvas.height
    );

    pixelArray = offscreenCtx.getImageData(0, 0, w, h);
    pixelArray.data = shuffle(pixelArray.data);

    offscreenCtx.putImageData(pixelArray, 0, 0);

    inCtx.drawImage(
        offscreenCanvas,
        0,
        0,
        w,
        h,
        0,
        0,
        inCanvas.width,
        inCanvas.height
    );


    inCtx.restore();
}