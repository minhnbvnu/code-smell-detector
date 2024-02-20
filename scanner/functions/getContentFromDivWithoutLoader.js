function getContentFromDivWithoutLoader(id, spanId) {
    $(`#${spanId}`).remove();
    return document.getElementById(id);
}