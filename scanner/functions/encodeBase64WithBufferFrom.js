function encodeBase64WithBufferFrom() {
        var json = this.toJSON();
        return Buffer.from(json, 'utf8').toString('base64');
    }