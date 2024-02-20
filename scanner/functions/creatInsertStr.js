function creatInsertStr(url,width,height,align,cssfloat,toEmbed){
        return  !toEmbed ?
                '<img ' +
                    (align && !cssfloat? 'align="' + align + '"' : '') +
                    (cssfloat ? 'style="float:' + cssfloat + '"' : '') +
                    ' width="'+ width +'" height="' + height + '" _url="'+url+'" class="edui-faked-music"' +
                    ' src="'+me.options.langPath+me.options.lang+'/images/music.png" />'
            :
            '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
                ' src="' + url + '" width="' + width  + '" height="' + height  + '" '+ (align && !cssfloat? 'align="' + align + '"' : '') +
                (cssfloat ? 'style="float:' + cssfloat + '"' : '') +
                ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
    }