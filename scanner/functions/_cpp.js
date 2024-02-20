function _cpp(source){
        oKeys(source).forEach(function(key){
            this[key] = source[key];
        },this);
    }