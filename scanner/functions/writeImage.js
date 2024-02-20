function writeImage() {
    for(i=0; i<Ne; i++) {
        data[i] = /*Math.round*/(Math.log(image[i])*255)|0;
    }
    /*ctx.clearRect(0, 0, Nc, Nr);
    ctx.putImageData(imageData, 0, 0);*/
}