function url2sub(url) {
    return new Promise((resolve) => {
        const $video = document.createElement('video');
        const $track = document.createElement('track');
        $track.default = true;
        $track.kind = 'metadata';
        $video.appendChild($track);
        $track.onload = () => {
            resolve(
                Array.from($track.track.cues).map((item) => {
                    const start = DT.d2t(item.startTime);
                    const end = DT.d2t(item.endTime);
                    const text = item.text;
                    return new Sub({ start, end, text });
                }),
            );
        };
        $track.src = url;
    });
}