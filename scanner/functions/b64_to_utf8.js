function b64_to_utf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }