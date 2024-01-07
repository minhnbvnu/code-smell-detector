function b64toBlob(b64Data, contentType) {
    const byteCharacters = atob(b64Data);
    const arraybuffer = new ArrayBuffer(byteCharacters.length);
    const view = new Uint8Array(arraybuffer);
    for (let i = 0; i < byteCharacters.length; i++) {
        view[i] = byteCharacters.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([arraybuffer], { type: contentType });
    return blob;
}