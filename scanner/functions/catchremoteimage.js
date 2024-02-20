function catchremoteimage(imgs, callbacks) {
            var params = utils.serializeParam(me.queryCommandValue('serverparam')) || '',
                url = utils.formatUrl(catcherActionUrl + (catcherActionUrl.indexOf('?') == -1 ? '?':'&') + params),
                isJsonp = utils.isCrossDomainUrl(url),
                opt = {
                    'method': 'POST',
                    'dataType': isJsonp ? 'jsonp':'',
                    'timeout': 60000, //单位：毫秒，回调请求超时设置。目标用户如果网速不是很快的话此处建议设置一个较大的数值
                    'onsuccess': callbacks["success"],
                    'onerror': callbacks["error"]
                };
            opt[catcherFieldName] = imgs;
            ajax.request(url, opt);
        }