function UrlInfo(url) {
        this.url = url;
        this.state = UrlStates.LOADING;
        this.loadCallbacks = [];
        this.failCallbacks = [];
    }