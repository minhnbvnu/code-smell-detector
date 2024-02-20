function getBinaryContent(url, start, end, i) {
    return new Promise((resolve, reject) => {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.setRequestHeader("range", `bytes=${start}-${end}`);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                resolve({
                    index: i,
                    buffer: xhr.response,
                });
            };
            xhr.send();
        } catch (err) {
            reject(new Error(err));
        }
    });
}