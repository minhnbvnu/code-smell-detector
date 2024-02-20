function closeClient() {
    if (nativeapp && isQuadserver) {
        postToServer({command: 'quit'});
        setTimeout(function () { window.close(); }, 500);
    } else {
        window.close();
    }
}