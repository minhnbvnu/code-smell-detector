function _renderAllPug() {
    console.log('### INFO: Rendering All');
    _.each(allPugFiles, (value, filePath) => {
        renderPug(filePath);
    });
}