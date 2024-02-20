function _createFunName(fun){
        var name = '';

        if(baidu.lang.isFunction(fun)){
            name = _createString();
            window[name] = function(){
                fun.apply(window, arguments);
            };

            return name;
        }else if(baidu.lang.isString){
            return fun;
        }
    }