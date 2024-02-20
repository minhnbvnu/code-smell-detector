function convertBlobToBuffer(blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onloadend = event => {
            let data = event.target.result;
            if (data instanceof ArrayBuffer) {
                data = toBuffer(new Uint8Array(event.target.result));
            }
            resolve(data);
        };
        fileReader.onerror = error => {
            reject(new Error(error.type));
        };
        fileReader.onabort = error => {
            reject(new Error(error.type));
        };
        fileReader.readAsArrayBuffer(blob);
    });
}