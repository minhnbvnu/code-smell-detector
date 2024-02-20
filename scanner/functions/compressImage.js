function compressImage(image, options, res, gcsStream) {
    const writeStream = concatStream(handleCompression);

    pump(image.stream, writeStream, err => {
        if(err) {

            log.error(err, 'error into pump [fn][compressImage]');
            // on error, stream.end will not be called automatically.
            image.stream.destroy(err);
            writeStream.destroy(err);
            return errors.internalServer(res);
        }
    })

    async function doLosslessComp(buf) {
        try {
            const compBuf = await imagemin.buffer(buf, {
                plugins: [ imageminOptipng(), imageminJpegtran() ]
            });
            return compBuf;
        }
        catch(err) {
            log.error(err, 'Error processing lossless compression [fn][doLosslessComp]');
            return errors.internalServer(res);
        }
    }


    async function handleCompression(originalBuf) {
        let finalBuf = null;
        if(options.lossy === false || options.lossy === 'false') {
            // do lossless compression.
            logdev.info('Option [lossy: false]. Compressing using lossless algorithm');
            finalBuf = await doLosslessComp(originalBuf);
        }
        else {
            // lossy either undefined or true. In that case, try lossy first and then lossless (if output size greater than
            // input size)

            try {
                const compBuf = await imagemin.buffer(originalBuf, {
                    plugins: [ imageminPngquant(), imageminMozjpeg({quality: getQualityFactor(image.size)}) ]
                });

                if(compBuf.length >= image.size) {
                    logdev.info('Fallback to lossless compression algorithm');
                    finalBuf = await doLosslessComp(originalBuf);
                }
                else {
                    finalBuf = compBuf;
                }

            }
            catch(err) {
                log.error(err, 'Error processing using imagemin [fn][handleCompression]');
                return errors.internalServer(res);
            }
        }

        // finally upload to GCS.
        uploadToGCS(finalBuf, res, gcsStream);

    }
}