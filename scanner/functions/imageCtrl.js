async function imageCtrl(req, res, next) {
    const image = req.file;
    const options = req.body;

    // check errors
    if(!image) {
        return errors.badRequest(res);
    }
    if(!utils.isFileTypeValid(image)) {
        log.warn({req: req}, 'File with Unsupported media type post');
        return errors.unsupportedMediaType(res);
    }

    // compress image
    const filename = generateFilename(image);
    const gcsFile = gcsBucket.file(filename);
    const gcsStream = gcsFile.createWriteStream({
        metadata: {
            contentType: image.detectedMimeType,
            contentDisposition: 'attachment',
            metadata: {
                originalBytes: image.size
            }
        },
        resumable: false        // disable resumable for file size < 10MB.
    })
    // compress the image. Currently support only png/jpeg files.
    compressImage(image, options, res, gcsStream);

    // send the response.
    // Make sure request timeout limit longer in nginx to not abrupt connection.
    gcsStream
        .on('error', (err) => {
            log.error(err, 'Error uploading file');
            return errors.internalServer(res);
        })
        .on('finish', async () => {
            const metadata = await gcsFile.getMetadata();
            await gcsFile.makePublic();
            const obj = {
                id: filename,
                url: utils.getDownloadUrl(filename),
                message: 'File upload successfully',
                success: true,
                type: image.detectedMimeType,
                compressedBytes: metadata && metadata[0] && metadata[0].size,   // api response.
                bytes: image.size
            }
            log.info({req: req, res: res, metadata: obj}, "File Uploaded Successfully");
            res.send(obj);

        })

}