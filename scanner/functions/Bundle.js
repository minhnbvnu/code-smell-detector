constructor(files) {
        this._blobUrls = {};

        for (let i = 0, len = files.length; i < len; i++) {
            if (files[i].url) {
                this._blobUrls[files[i].name] = files[i].url;
            }
        }
    }