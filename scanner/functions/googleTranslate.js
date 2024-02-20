async function googleTranslate(subtitle = [], lang) {
    return new Promise((resolve, reject) => {
        const result = [];
        (function loop() {
            const item = subtitle.shift();
            if (item) {
                translate(item.text, lang)
                    .then((text) => {
                        item.text = text;
                        result.push(item);
                        sleep(100).then(loop);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                resolve(result);
            }
        })();
    });
}