function validateBoolOptions(options){
        if(!options.bool){
            options.bool = {
                text:  {
                    true : "true",
                    false : "false"
                },
                img : {
                    true: "",
                    false: ""
                },
                showImage : false,
                showText : true
            };
        } else {
            var boolOptions = options.bool;

            // Show text if no option
            if(!boolOptions.showText && !boolOptions.showImage){
                boolOptions.showImage  =  false;
                boolOptions.showText  =  true;
            }

            if(boolOptions.showText){
                if(!boolOptions.text){
                    boolOptions.text = {
                        true : "true",
                        false : "false"
                    };
                } else {
                    var t = boolOptions.text.true, f = boolOptions.text.false;

                    if(getType(t) != STRING || t === ''){
                        boolOptions.text.true = 'true';
                    }

                    if(getType(f) != STRING || f === ''){
                        boolOptions.text.false = 'false';
                    }
                }
            }

            if(boolOptions.showImage){
                if(!boolOptions.img.true && !boolOptions.img.false){
                    boolOptions.showImage = false;
                }
            }
        }

        return options;
    }