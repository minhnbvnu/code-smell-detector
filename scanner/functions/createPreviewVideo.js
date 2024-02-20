function createPreviewVideo(url){
        if ( !url )return;

        var conUrl = convert_url(url);

        $G("preview").innerHTML = '<div class="previewMsg"><span>'+lang.urlError+'</span></div>'+
        '<embed class="previewVideo" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
            ' src="' + conUrl + '"' +
            ' width="' + 420  + '"' +
            ' height="' + 280  + '"' +
            ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' +
        '</embed>';
    }