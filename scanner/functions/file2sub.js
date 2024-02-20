function file2sub(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const ext = getExt(file.name);
            if (ext === 'json') {
                try {
                    const sub = JSON.parse(reader.result).map((item) => new Sub(item));
                    resolve(sub);
                } catch (error) {
                    reject(error);
                }
            } else {
                const text = reader.result.replace(/{[\s\S]*?}/g, '');
                switch (ext) {
                    case 'vtt': {
                        const url = vtt2url(text);
                        const sub = await url2sub(url);
                        resolve(sub);
                        break;
                    }
                    case 'ass': {
                        const vtt = ass2vtt(text);
                        const url = vtt2url(vtt);
                        const sub = await url2sub(url);
                        resolve(sub);
                        break;
                    }
                    case 'srt': {
                        const vtt = srt2vtt(text);
                        const url = vtt2url(vtt);
                        const sub = await url2sub(url);
                        resolve(sub);
                        break;
                    }
                    case 'json': {
                        const sub = JSON.parse(text).map((item) => new Sub(item));
                        resolve(sub);
                        break;
                    }
                    default:
                        resolve([]);
                        break;
                }
            }
        };
        reader.readAsText(file);
    });
}