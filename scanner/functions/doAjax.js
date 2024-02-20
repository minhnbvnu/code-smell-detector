function doAjax(url, ajaxOptions) {
        var xhr = creatAjaxRequest(),
        //是否超时
            timeIsOut = false,
        //默认参数
            defaultAjaxOptions = {
                method:"POST",
                timeout:5000,
                async:true,
                data:{},//需要传递对象的话只能覆盖
                onsuccess:function() {
                },
                onerror:function() {
                }
            };

        if (typeof url === "object") {
            ajaxOptions = url;
            url = ajaxOptions.url;
        }
        if (!xhr || !url) return;
        var ajaxOpts = ajaxOptions ? utils.extend(defaultAjaxOptions,ajaxOptions) : defaultAjaxOptions;

        var submitStr = json2str(ajaxOpts);  // { name:"Jim",city:"Beijing" } --> "name=Jim&city=Beijing"
        //如果用户直接通过data参数传递json对象过来，则也要将此json对象转化为字符串
        if (!utils.isEmptyObject(ajaxOpts.data)){
            submitStr += (submitStr? "&":"") + json2str(ajaxOpts.data);
        }
        //超时检测
        var timerID = setTimeout(function() {
            if (xhr.readyState != 4) {
                timeIsOut = true;
                xhr.abort();
                clearTimeout(timerID);
            }
        }, ajaxOpts.timeout);

        var method = ajaxOpts.method.toUpperCase();
        var str = url + (url.indexOf("?")==-1?"?":"&") + (method=="POST"?"":submitStr+ "&noCache=" + +new Date);
        xhr.open(method, str, ajaxOpts.async);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (!timeIsOut && xhr.status == 200) {
                    ajaxOpts.onsuccess(xhr);
                } else {
                    ajaxOpts.onerror(xhr);
                }
            }
        };
        if (method == "POST") {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(submitStr);
        } else {
            xhr.send(null);
        }
    }