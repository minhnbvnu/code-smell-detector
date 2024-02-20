function exportSetup(){
    
    $('.textbox-container').click(function(e) {
        if(
            $(e.target).is('#icon-exp') ||
            $(e.target).is('.export-panel') ||
            $(e.target).is('.sbutton.export')
        ){
            e.preventDefault();
            return;
        }
        hideExportPanel();
    });    
    
    $(".export-panel").click(function(e) {
         e.stopPropagation();
    });
    
    $('.sbutton.export').click(function() {
        // document.querySelector('.container').innerHTML = downloadButtons;
        var origin = $('#icon-exp').offset();
        var right = parseInt( $('body').width() - origin.left + 25 );
        var top = parseInt( origin.top ) - 50;
        
        const filename = getFilename();
        const data = {
            text: document.querySelector('#textbox').innerHTML,
            filename: filename
        };
        
        $('.export-panel')
            .html(generateButtons(filename));

        exportFormats.send.forEach(format => {

            if (format.ready) {
                format.fn(data);
            } else {
                format.setup(() => {
                    format.ready = true;
                    setTimeout(() => {
                        format.fn(data)
                    }, 500);
                });
            }
        });

        $('.export-panel')
            .css({'right': right,'top': top})
            .addClass('active'); 
        
    });
}