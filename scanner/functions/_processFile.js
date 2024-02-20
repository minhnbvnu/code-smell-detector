function _processFile(filePath, watchEvent) {
    
    if (!READY) {
        if (filePath.match(/\.pug$/)) {
            if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
                allPugFiles[filePath] = true;
            }    
        }    
        process.stdout.write('.');
        return;
    }

    console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);

    if (filePath.match(/\.pug$/)) {
        return _handlePug(filePath, watchEvent);
    }

    if (filePath.match(/\.scss$/)) {
        if (watchEvent === 'change') {
            return _handleSCSS(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/src\/js\//)) {
        return renderScripts();
    }

    if (filePath.match(/src\/assets\//)) {
        return renderAssets();
    }

}