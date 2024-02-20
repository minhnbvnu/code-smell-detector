function fixIE6FixedPos(){
        var docStyle = document.body.style;
        docStyle.backgroundImage = 'url("about:blank")';
        docStyle.backgroundAttachment = 'fixed';
    }