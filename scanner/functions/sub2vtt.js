function sub2vtt(sub) {
    return (
        'WEBVTT\n\n' +
        sub
            .map((item, index) => {
                return index + 1 + '\n' + item.start + ' --> ' + item.end + '\n' + item.text;
            })
            .join('\n\n')
    );
}