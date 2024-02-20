function vtt2url(vtt) {
    return URL.createObjectURL(
        new Blob([vtt], {
            type: 'text/vtt',
        }),
    );
}