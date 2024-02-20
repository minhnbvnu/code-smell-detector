function inputSetup(opts) {
    
    var input = new oTinput({
        element: '.file-input-outer',
        onFileChange: function(file){
            opts.create(file);
            saveFileDetails(file.name);
            hide();
        },
        onFileError: function(err, file){
            var msg = document.webL10n.get('format-warn');
            msg = msg.replace('[file-format]',file.type.split("/")[1]);
            $('#formats').html(msg).addClass('warning');
        },
        onURLSubmit: function(url){
            input.showURLInput();
            opts.createFromURL(url);
            hide();
        },
        onURLError: function(error){
            var msg = document.webL10n.get('youtube-error');
            $('.ext-input-warning').text(msg).show();
        },
        onDragover: function(){
            $('.file-input-wrapper').addClass('hover');
        },
        onDragleave: function(){
            $('.file-input-wrapper').removeClass('hover');
        },
        text: {
            button: '<i class="fa fa-arrow-circle-o-up"></i>'+document.webL10n.get('choose-file'),
            altButton: document.webL10n.get('choose-youtube'),
            altInputText: document.webL10n.get('youtube-instrux'),
            closeAlt: '<i class="fa fa-times"></i>'
        }
    });    

    // this is a workaround for an iOS bug 
    if (is_iOS()) {
        document
            .querySelector('.file-input-outer input[type="file"]')
            .removeAttribute('accept');
    }
    setFormatsMessage( oTinput.getSupportedFormats() );
    loadPreviousFileDetails();
    show();
    
    return function reset() {
        loadPreviousFileDetails();
        show();
    }

}