function decodeBase64WithAtob(base64) {
        return decodeURIComponent(escape(atob(base64)));
    }