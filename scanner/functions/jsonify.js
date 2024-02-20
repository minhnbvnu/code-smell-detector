function jsonify(table, respData, mediaType, headers, xformers, respCb, errorCb) {

    if (!respData || /^\s*$/.test(respData)) {
        respCb({});
    }
    else if(xformers[table]) {
        xformers[table].toJson(respData, respCb, errorCb, headers);
    }
    else if(mediaType.subtype === 'xml' || /\+xml$/.test(mediaType.subtype)) {
        xformers['xml'].toJson(respData, respCb, errorCb, headers);
    }
    else if(mediaType.subtype === 'json') {
        xformers['json'].toJson(respData, respCb, errorCb, headers);
    }
    else if(mediaType.subtype === 'csv') {
        xformers['csv'].toJson(respData, respCb, errorCb,
            (mediaType.params && mediaType.params.header != undefined));
    }
    else if(mediaType.type === 'text') {
        // Try JSON first
        xformers['json'].toJson(respData, respCb, function() {
            // if error Try XML
            xformers['xml'].toJson(respData, respCb, errorCb);
        });
    }
    else {
        errorCb({message:"No transformer available", type:mediaType.type, subType:mediaType.subtype})
    }
}