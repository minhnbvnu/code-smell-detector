function _handlePug(filePath, watchEvent) {
    if (watchEvent === 'change') {
        if (filePath.match(/includes/) || filePath.match(/mixins/) || filePath.match(/\/pug\/layouts\//)) {
            return _renderAllPug();
        }
        return renderPug(filePath);
    }
    if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
        return renderPug(filePath);
    }
}