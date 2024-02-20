function onOpenFolder(filename) {
    postToServer({command: 'open', app: '<finder>', file: filename});
}