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