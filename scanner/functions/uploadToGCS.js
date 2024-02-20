function uploadToGCS(buf, res, gcsStream) {
    const rs = utils.createReadStream(buf);
    rs.pipe(gcsStream);
    rs.on('error', (err) => {
        log.error(err, 'Error uploading to Google Cloud Storage after compression');
        return errors.internalServer(res);
    })
}