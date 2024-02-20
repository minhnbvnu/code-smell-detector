function updateBounds(w, h) {
    boundPos.leftPos = boundPos.topPos = Number.MAX_VALUE;
    boundPos.rightPos = boundPos.bottomPos = -1;

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var imageWidth = imgData.width;
    var imageHeight = imgData.height;
    var imageData = imgData.data;

    //Iterate through all pixels in image
    //used to get image bounds (where shadow ends)
    for(var i=0; i<imageData.length; i+=4) {
        if (imageData[i+3] != 0) { //check for non alpha pixel
            var x = (i / 4) % imageWidth;
            var y = Math.floor((i / 4) / imageWidth);

            if (x < boundPos.leftPos) {
                boundPos.leftPos = x;
            } else if (x > boundPos.rightPos) {
                boundPos.rightPos = x;
            }

            if (y < boundPos.topPos) {
                boundPos.topPos = y;
            } else if (y > boundPos.bottomPos) {
                boundPos.bottomPos = y;
            }
        }
    }

    var actualWidth = boundPos.rightPos - boundPos.leftPos;
    var actualHeight = boundPos.bottomPos - boundPos.topPos;
    var actualPaddingTop = imageHeight/2 - h/2 - boundPos.topPos;
    var actualPaddingBottom = boundPos.bottomPos - (imageHeight/2 + h/2);
    var actualPaddingLeft = imageWidth/2 - w/2 - boundPos.leftPos;
    var actualPaddingRight = boundPos.rightPos - (imageWidth/2 + w/2);

    var msg = ['actual size: [', actualWidth, actualHeight, ']',
        ' shadow [', actualPaddingTop, actualPaddingRight, actualPaddingBottom, actualPaddingLeft,  ']'].join(' ');
    //show the actual size
    $('#actual-padding').html(msg);

    //change to desire bounds
    if(paddingLeft != 0){
        boundPos.leftPos = (imageWidth - w) / 2 - paddingLeft;
    }
    if(paddingRight != 0){
        boundPos.rightPos = imageWidth / 2 + w / 2 + paddingRight;
    }
    if(paddingTop != 0){
        boundPos.topPos = (imageHeight - h) / 2 - paddingTop;
    }
    if(paddingBottom != 0){
        boundPos.bottomPos = imageHeight / 2 + h / 2 + paddingBottom;
    }

    boundPos.leftPos = boundPos.leftPos - 1;
    boundPos.topPos = boundPos.topPos - 1;
    boundPos.rightPos = imageWidth - boundPos.rightPos - 2;
    boundPos.bottomPos = imageHeight - boundPos.bottomPos - 2;

    //Calculate final canvas width and height
    boundPos.canvasWidth = Math.round(canvas.width - (boundPos.leftPos + boundPos.rightPos));
    boundPos.canvasHeight = Math.round(canvas.height - (boundPos.topPos + boundPos.bottomPos));

    //Add clipping If set
    var clipLeft = clipSide.left ? getRelativeX() + roundRadius.lowerLeft: 0;
    var clipTop = clipSide.top ? getRelativeY() + roundRadius.upperLeft : 0;
    var clipRight = clipSide.right ? boundPos.canvasWidth - objectWidth - getRelativeX() + roundRadius.lowerRight: 0;
    var clipBottom = clipSide.bottom ? boundPos.canvasHeight - objectHeight - getRelativeY() + roundRadius.upperRight: 0;

    boundPos.leftPos += clipLeft;
    boundPos.topPos += clipTop;
    boundPos.rightPos += clipRight;
    boundPos.bottomPos += clipBottom;

    boundPos.clipLeft = clipLeft;

    boundPos.canvasWidth -= clipLeft + clipRight;
    boundPos.canvasHeight -= clipBottom + clipTop;
}