async function pasteFromClipboard(successCallback, failureCallback) {
    console.assert(successCallback);
    try {
        const text = await navigator.clipboard.readText();
        successCallback(text);
    } catch (err) {
        if (failureCallback) { failureCallback(); }
        console.warn('Failed to read clipboard contents: ', err);
    }
}