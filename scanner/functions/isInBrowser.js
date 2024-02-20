function isInBrowser() {
        if (environment === "browser")
            return true;
        if (environment === "node")
            return false;
        return ((typeof window !== 'undefined') && (typeof XMLHttpRequest === 'function') && !(window.require && window.module && window.process && window.process.type === "renderer"));
    }