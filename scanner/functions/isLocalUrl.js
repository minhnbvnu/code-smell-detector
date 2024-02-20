function isLocalUrl(url) {
        return !url.match(/^(https?:\/\/|mailto:)/) || url.indexOf(base) === 0;
    }