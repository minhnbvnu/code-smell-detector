function browserAddListener() {
            window.postMessage({ id: _uuid, name: "BROWSER_ADD_LISTENER"});
        }