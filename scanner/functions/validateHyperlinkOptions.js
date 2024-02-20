function validateHyperlinkOptions(options){
        var hyperlinks = {
            enable : false,
            keys : null,
            target : ''
        };

        if(options.hyperlinks && options.hyperlinks.enable) {
            hyperlinks.enable = true;

            hyperlinks.keys =  isArray(options.hyperlinks.keys) ? options.hyperlinks.keys : [];

            if(options.hyperlinks.target) {
                hyperlinks.target = '' + options.hyperlinks.target;
            } else {
                hyperlinks.target = '_blank';
            }
        }

        options.hyperlinks = hyperlinks;

        return options;
    }