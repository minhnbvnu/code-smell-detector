function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }