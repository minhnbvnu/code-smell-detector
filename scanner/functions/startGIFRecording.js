function startGIFRecording() {
    if (! gifRecording) {
        document.getElementById('recording').innerHTML = 'RECORDING';
        document.getElementById('recording').classList.remove('hidden');
        const baseScale = 1;
        const scale = ((updateImage.width <= 384/2) ? (updateImage.width <= 64 ? 4 : 2) : 1) * baseScale;
        gifRecording = new GIF({workers:4, quality:3, dither:false, width: scale * updateImage.width, height: scale * updateImage.height});
        gifRecording.frameNum = 0;

        gifRecording.scale = scale;
        if (gifRecording.scale > 1) {
            const gifImage = document.createElement('canvas');
            gifImage.width = gifRecording.scale * updateImage.width;
            gifImage.height = gifRecording.scale * updateImage.height;
            gifCtx = gifImage.getContext("2d");
            gifCtx.msImageSmoothingEnabled = gifCtx.webkitImageSmoothingEnabled = gifCtx.imageSmoothingEnabled = false;
        }
        
        gifRecording.on('finished', function (blob) {
            //window.open(URL.createObjectURL(blob));
            download(URL.createObjectURL(blob), makeDateFilename() + '.gif');

            document.getElementById('recording').innerHTML = '';
            document.getElementById('recording').classList.add('hidden');
            gifCtx = null;
        });
    }
}