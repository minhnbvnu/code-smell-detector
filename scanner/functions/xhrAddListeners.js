function xhrAddListeners(xhr, tab, id, xhrId, details) {
    if (details.onabort) {
        xhr.addEventListener("abort", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.onerror) {
        xhr.addEventListener("error", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.onload) {
        xhr.addEventListener("load", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.onloadend) {
        xhr.addEventListener("loadend", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.onloadstart) {
        xhr.addEventListener("loadstart", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.onprogress) {
        xhr.addEventListener("progress", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.onreadystatechange) {
        xhr.addEventListener("readystatechange", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
    if (details.ontimeout) {
        xhr.addEventListener("timeout", e => xhrHandleEvent(e, xhr, tab, id, xhrId));
    }
}