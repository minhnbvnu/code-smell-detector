function appendTimeToUrl(url) {

            if (url.indexOf('?') < 0) {
                url += '?';
            } else {
                url += '&';
            }

            url += '_=' + new Date().getTime();

            return url;
        }