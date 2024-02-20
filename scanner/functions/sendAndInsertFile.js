function sendAndInsertFile(file, editor) {
        var me  = editor;
        //模拟数据
        var fieldName, urlPrefix, maxSize, allowFiles, actionUrl,
            loadingHtml, errorHandler, successHandler,
            filetype = /image\/\w+/i.test(file.type) ? 'image':'file',
            loadingId = 'loading_' + (+new Date()).toString(36);

        fieldName = me.getOpt(filetype + 'FieldName');
        urlPrefix = me.getOpt(filetype + 'UrlPrefix');
        maxSize = me.getOpt(filetype + 'MaxSize');
        allowFiles = me.getOpt(filetype + 'AllowFiles');
        actionUrl = me.getActionUrl(me.getOpt(filetype + 'ActionName'));
        errorHandler = function(title) {
            var loader = me.document.getElementById(loadingId);
            loader && domUtils.remove(loader);
            me.fireEvent('showmessage', {
                'id': loadingId,
                'content': title,
                'type': 'error',
                'timeout': 4000
            });
        };

        if (filetype == 'image') {
            loadingHtml = '<img class="loadingclass" id="' + loadingId + '" src="' +
                me.options.themePath + me.options.theme +
                '/images/spacer.gif" title="' + (me.getLang('autoupload.loading') || '') + '" >';
            successHandler = function(data) {
                var link = urlPrefix + data.url,
                    loader = me.document.getElementById(loadingId);
                if (loader) {
                    loader.setAttribute('src', link);
                    loader.setAttribute('_src', link);
                    loader.setAttribute('title', data.title || '');
                    loader.setAttribute('alt', data.original || '');
                    loader.removeAttribute('id');
                    domUtils.removeClasses(loader, 'loadingclass');
                }
            };
        } else {
            loadingHtml = '<p>' +
                '<img class="loadingclass" id="' + loadingId + '" src="' +
                me.options.themePath + me.options.theme +
                '/images/spacer.gif" title="' + (me.getLang('autoupload.loading') || '') + '" >' +
                '</p>';
            successHandler = function(data) {
                var link = urlPrefix + data.url,
                    loader = me.document.getElementById(loadingId);

                var rng = me.selection.getRange(),
                    bk = rng.createBookmark();
                rng.selectNode(loader).select();
                me.execCommand('insertfile', {'url': link});
                rng.moveToBookmark(bk).select();
            };
        }

        /* 插入loading的占位符 */
        me.execCommand('inserthtml', loadingHtml);

        /* 判断后端配置是否没有加载成功 */
        if (!me.getOpt(filetype + 'ActionName')) {
            errorHandler(me.getLang('autoupload.errorLoadConfig'));
            return;
        }
        /* 判断文件大小是否超出限制 */
        if(file.size > maxSize) {
            errorHandler(me.getLang('autoupload.exceedSizeError'));
            return;
        }
        /* 判断文件格式是否超出允许 */
        var fileext = file.name ? file.name.substr(file.name.lastIndexOf('.')):'';
        if ((fileext && filetype != 'image') || (allowFiles && (allowFiles.join('') + '.').indexOf(fileext.toLowerCase() + '.') == -1)) {
            errorHandler(me.getLang('autoupload.exceedTypeError'));
            return;
        }

        /* 创建Ajax并提交 */
        var xhr = new XMLHttpRequest(),
            fd = new FormData(),
            params = utils.serializeParam(me.queryCommandValue('serverparam')) || '',
            url = utils.formatUrl(actionUrl + (actionUrl.indexOf('?') == -1 ? '?':'&') + params);

        fd.append(fieldName, file, file.name || ('blob.' + file.type.substr('image/'.length)));
        fd.append('type', 'ajax');
        xhr.open("post", url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.addEventListener('load', function (e) {
            try{
                var json = (new Function("return " + utils.trim(e.target.response)))();
                if (json.state == 'SUCCESS' && json.url) {
                    successHandler(json);
                } else {
                    errorHandler(json.state);
                }
            }catch(er){
                errorHandler(me.getLang('autoupload.loadError'));
            }
        });
        xhr.send(fd);
    }