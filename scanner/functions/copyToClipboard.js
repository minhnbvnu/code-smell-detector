async function copyToClipboard(text, successCallback, failureCallback) {
    try {
        await navigator.clipboard.writeText(text);
        if (successCallback) { successCallback(); }
    } catch (err) {
        if (failureCallback) { failureCallback(); }
        console.error('Failed to copy: ', err);
    }
}