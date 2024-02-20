function sniffMediaType(res, respData, args) {
    // 1. If there is a patch, call it to get the media type.
    var mediaType = args.resource.patchMediaType(res.statusCode, res.headers, respData, args)
        || res.headers['content-type'];

    // 2. If the media type is "XML", treat it as "application/xml"
    mediaType = mediaType === 'XML' ? 'application/xml' : mediaType;

    // 3. If the media type is "JSON", treat it as "application/json"
    mediaType = mediaType === 'JSON' ? 'application/json' : mediaType;

    // If none found, assume "application/json"
    mediaType = mediaType || 'application/json';

    // 4. If the media type is "text/xml", treat it as "application/xml"
    mediaType = (mediaType === 'text/xml') ? 'application/xml' : mediaType;

    return _headers.parse('content-type', mediaType);
}