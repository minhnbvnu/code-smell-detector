function doJsonp(url, opts) {

        var successhandler = opts.onsuccess || function(){},
            scr = document.createElement('SCRIPT'),
            options = opts || {},
            charset = options['charset'],
            callbackField = options['jsonp'] || 'callback',
            callbackFnName,
            timeOut = options['timeOut'] || 0,
            timer,
            reg = new RegExp('(\\?|&)' + callbackField + '=([^&]*)'),
            matches;

        if (utils.isFunction(successhandler)) {
            callbackFnName = 'bd__editor__' + Math.floor(Math.random() * 2147483648).toString(36);
            window[callbackFnName] = getCallBack(0);
        } else if(utils.isString(successhandler)){
            callbackFnName = successhandler;
        } else {
            if (matches = reg.exec(url)) {
                callbackFnName = matches[2];
            }
        }

        url = url.replace(reg, '\x241' + callbackField + '=' + callbackFnName);

        if (url.search(reg) < 0) {
            url += (url.indexOf('?') < 0 ? '?' : '&') + callbackField + '=' + callbackFnName;
        }

        var queryStr = json2str(opts);  // { name:"Jim",city:"Beijing" } --> "name=Jim&city=Beijing"
        //如果用户直接通过data参数传递json对象过来，则也要将此json对象转化为字符串
        if (!utils.isEmptyObject(opts.data)){
            queryStr += (queryStr? "&":"") + json2str(opts.data);
        }
        if (queryStr) {
            url = url.replace(/\?/, '?' + queryStr + '&');
        }

        scr.onerror = getCallBack(1);
        if( timeOut ){
            timer = setTimeout(getCallBack(1), timeOut);
        }
        createScriptTag(scr, url, charset);

        function createScriptTag(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            scr.setAttribute('defer', 'defer');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            document.getElementsByTagName('head')[0].appendChild(scr);
        }

        function getCallBack(onTimeOut){
            return function(){
                try {
                    if(onTimeOut){
                        options.onerror && options.onerror();
                    }else{
                        try{
                            clearTimeout(timer);
                            successhandler.apply(window, arguments);
                        } catch (e){}
                    }
                } catch (exception) {
                    options.onerror && options.onerror.call(window, exception);
                } finally {
                    options.oncomplete && options.oncomplete.apply(window, arguments);
                    scr.parentNode && scr.parentNode.removeChild(scr);
                    window[callbackFnName] = null;
                    try {
                        delete window[callbackFnName];
                    }catch(e){}
                }
            }
        }
    }