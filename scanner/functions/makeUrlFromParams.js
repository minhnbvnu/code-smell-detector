function makeUrlFromParams(baseUrl, params) {
        params = params || [];

        var url = "http://harviewer:49001/webapp/";
        if (baseUrl) {
            url += "?baseUrl=" + baseUrl + "&";
        } else {
            url += "?";
        }

        return url + params.join("&");
    }