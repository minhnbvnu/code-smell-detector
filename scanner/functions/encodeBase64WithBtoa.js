function encodeBase64WithBtoa() {
        var json = this.toJSON();
        return btoa(unescape(encodeURIComponent(json)));
    }