function setEditorContents( dirtyText, opts = {} ) {
    
    const newText = cleanHTML(dirtyText);

    var $textbox = $("#textbox");
    
    function replaceText() {
        if (typeof newText === 'string') {
            $textbox[0].innerHTML = newText;
        } else {
            textbox[0].innerHTML = '';
            $textbox[0].appendChild(newText);    
        }
        activateTimestamps();
        $('.textbox-container').scrollTop(0);
    }
    
    if (opts.transition) {
        $textbox.fadeOut(300,function(){
            replaceText();
            $(this).fadeIn(300);
        });        
    } else {
        replaceText();
    }

}