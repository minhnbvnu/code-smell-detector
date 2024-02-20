function is_cors_enabled () {
        var xhr = new XMLHttpRequest();
        return 'withCredentials' in xhr;
    }