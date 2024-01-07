function getThumbnailPath() {
    const i = href.indexOf("/examples/");
    if (i === -1) { // npm run serve
        return '/thumbnails/';
    }
    return href.substring(0, i) + "/examples/dist/thumbnails/";
}