async function urlCtrl(req, res, next) {
    let url;
    try {
        url = new URL(req.body.url);
    }
    catch(e) {
        // TODO: Better error message for url parse.
        logdev.error('Either URL is invalid or null');
        return errors.badRequest(res, {message: 'Either URL is invalid or null'})

    }
    if(!/(http:)|(https:)/.test(url.protocol))  {
        return errors.badRequest(res, {message: 'Only http or https protocol supported'})
    }


    const filename = crypto.createHash('sha256').update(url.href).digest('hex');
    const exists = await gcsBucket.file(filename).exists();
    const gcsFile = gcsBucket.file(filename);
    const defaultResponse = {
        id: filename,
        url: utils.getDownloadUrl(filename),
        message: 'File uploaded Successfully',
        success: true
    };

    if(exists[0]) {
        const metadata = await gcsFile.getMetadata();
        // if found on gcs, then return cache
        const meta = metadata && metadata[0];
        const obj = Object.assign({}, defaultResponse, {
            type: meta.contentType,
            compressedBytes: meta.size,
            bytes: meta.metadata && meta.metadata.bytes
        });
        log.info({req: req, res: res, metadata: obj}, "URL Compression. File Already Exists. Sending same file");
        return res.send(obj);
    }

    else {
        // If recieved mime-type wrong, then return .
        // If content-length > 12 MB, return.
        // Do a get request and read the data into memory until 12MB and again check mime-type via magic numbers.
        let bufferChunks = [];
        let isResponseSent = false;
        let isMaxFileSizeExceed = false;
        const image = {size: 0, stream: null};
        request
            .get(url.href)
            .on('response', (resp) => {

                if(resp.statusCode === 404) {
                    isResponseSent = true;
                    resp.destroy();
                    return errors.notFound(res);
                }
                else if(resp.statusCode !== 200) {
                    isResponseSent = true;
                    resp.destroy();
                    return errors.badRequest(res);
                }
                resp.once('data', (chunk) => {
                    const type = fileType(chunk);
                    if(type) {
                        image.detectedMimeType = type.mime;
                        image.detectedFileExtension = '.' + type.ext;
                    }
                    if(!utils.isFileTypeValid(image)) {
                        isResponseSent = true;
                        resp.destroy();
                        return errors.unsupportedMediaType(res);
                    }

                });
                resp.on('data', (chunk) => {
                    if(image.size > MAX_FILE_SIZE + 1024*10) {    // maxFileSize + 10KB padding.
                        isMaxFileSizeExceed = true;
                        resp.destroy(); // https://stackoverflow.com/questions/11761542
                    }
                    image.size += chunk.length;  // efficient than `writeBuffer.length`.
                    bufferChunks.push(chunk);

                })
            })
            .on('end', () => {
                if(isResponseSent) return;
                if(isMaxFileSizeExceed)
                    return errors.entityTooLarge(res);
                if(image.size < 10*1024) // less than 10KB
                    return errors.unprocessableEntity(res, {message: 'File size too small'});

                const buffer = Buffer.concat(bufferChunks);
                // now compress the buffer.
                image.stream = utils.createReadStream(buffer);


                const gcsFile = gcsBucket.file(filename);
                const gcsStream = gcsFile.createWriteStream({
                    metadata: {
                        contentType: image.detectedMimeType,
                        contentDisposition: 'attachment',
                        metadata: {bytes: image.size}
                    },
                    resumable: false        // disable resumable for file size < 10MB.
                })

                // compress the image. Currently support only png/jpeg files.
                compressImage(image, {}, res, gcsStream);


                // finally send the response if compression successful.
                // Make sure request timeout limit longer in nginx to not abrupt connection.

                gcsStream
                    .on('error', (err) => {
                        log.error(err, 'Error uploading file');
                        return errors.internalServer(res);
                    })
                    .on('finish', async () => {
                        const metadata = await gcsFile.getMetadata();
                        await gcsFile.makePublic();
                        const obj = Object.assign({}, defaultResponse, {
                            type: image.detectedMimeType,
                            compressedBytes: metadata && metadata[0] && metadata[0].size,   // api response.
                            bytes: image.size
                        });
                        log.info({req: req, res: res, metadata: obj}, "URL Compression. File Uploaded Successfully");
                        res.send(obj);

                    })

            })
    }

}