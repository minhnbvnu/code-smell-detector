function xhrHandleEvent(e, xhr, tab, id, xhrId) {
    const name = `RESP_API_XHR_BG_${e.type.toUpperCase()}`;
    const x = {
        readyState: xhr.readyState,
        response: xhr.response,
        responseHeaders: xhr.getAllResponseHeaders(),
        responseType: xhr.responseType,
        responseURL: xhr.responseURL,
        status: xhr.status,
        statusText: xhr.statusText,
        timeout: xhr.timeout,
        withCredentials: xhr.withCredentials
    };
    // only include responseText when applicable
    if (["", "text"].includes(xhr.responseType)) x.responseText = xhr.responseText;
    // convert data if response is arraybuffer so sendMessage can pass it
    if (xhr.responseType === "arraybuffer") {
        const arr = Array.from(new Uint8Array(xhr.response));
        x.response = arr;
    }
    // convert data if response is blob so sendMessage can pass it
    if (xhr.responseType === "blob") {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = function () {
            const base64data = reader.result;
            x.response = {
                data: base64data,
                type: xhr.response.type
            };
            browser.tabs.sendMessage(tab, { operate: name, id: id, xhrId: xhrId, response: x });
        };
    }
    // blob response will execute its own sendMessage call
    if (xhr.responseType !== "blob") {
        browser.tabs.sendMessage(tab, { operate: name, id: id, xhrId: xhrId, response: x });
    }
}