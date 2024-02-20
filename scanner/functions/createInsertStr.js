function createInsertStr(obj,toEmbed){
        return  !toEmbed ?
            '<img title="'+obj.title+'" width="' + obj.width + '" height="' + obj.height + '"' +
                ' src="' + me.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" _logo_url="'+obj.logo+'" style="background:url(' + obj.logo
                +') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' + obj.url + '" ' +
                (obj.align && !obj.cssfloat? 'align="' + obj.align + '"' : '') +
                (obj.cssfloat ? 'style="float:' + obj.cssfloat + '"' : '') +
                '/>'
            :
            '<iframe class="edui-faked-webapp" title="'+obj.title+'" ' +
                (obj.align && !obj.cssfloat? 'align="' + obj.align + '"' : '') +
                (obj.cssfloat ? 'style="float:' + obj.cssfloat + '"' : '') +
                'width="' + obj.width + '" height="' + obj.height + '"  scrolling="no" frameborder="0" src="' + obj.url + '" logo_url = "'+obj.logo+'"></iframe>'

    }