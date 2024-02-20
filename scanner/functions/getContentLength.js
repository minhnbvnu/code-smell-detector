function getContentLength(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("HEAD", url);
        xhr.send();
        xhr.onload = function () {
            resolve(
                // xhr.getResponseHeader("Accept-Ranges") === "bytes" &&
                ~~xhr.getResponseHeader("Content-Length")
            );
        };
        xhr.onerror = reject;
    });
}