function generateButtons(filename) {
    
    const downloadData = exportFormats.download.map(format => {
        const clean = cleanHTML( getTexteditorContents() );
        const file = format.fn(clean);
        const blob = new Blob([file], {type: 'data:text/plain'});
        const href = window.URL.createObjectURL(blob);
        
        return {
            format: format,
            file: file,
            href: href,
            filename: getFilename()
        };
    });    

    if (checkDownloadAttrSupport() === false) {
        downloadData.forEach(format => {
            format.href = convertToBase64(format.file);
        });
    }    
  
    return Mustache.render(template, {
        downloads: downloadData
    });
    
}