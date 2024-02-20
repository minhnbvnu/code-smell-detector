function saveImage() {
    document.getElementById('imageCanvas').toBlob(
        function (blob) {
            var link = document.createElement('a');

            var nameWithoutPath = filename.replace(/.*[\\/]([^\\/]+)$/, '$1');
            var nameWithoutExtension = nameWithoutPath.replace(/\.[^.]*$/, '');

            link.download = nameWithoutExtension + '_scrubbed.png';
            link.href = URL.createObjectURL(blob);
            link.click();
        },
        'image/png',
        0.8
    );
}