function encodeBase64WithNewBuffer() {
        var json = this.toJSON();
        if (typeof json === 'number') {
            throw new TypeError('The json to encode must not be of type number.');
        }
        return new Buffer(json, 'utf8').toString('base64');
    }