function initButtons() {

        dialog.onok = function () {
            var remote = false, list = [], id, tabs = $G('tabhead').children;
            for (var i = 0; i < tabs.length; i++) {
                if (domUtils.hasClass(tabs[i], 'focus')) {
                    id = tabs[i].getAttribute('data-content-id');
                    break;
                }
            }

            switch (id) {
                case 'remote':
                    list = remoteImage.getInsertList();
                    break;
                case 'upload':
                    list = uploadImage.getInsertList();
                    var count = uploadImage.getQueueCount();
                    if (count) {
                        $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>');
                        return false;
                    }
                    break;
                case 'online':
                    list = onlineImage.getInsertList();
                    break;
                case 'search':
                    list = searchImage.getInsertList();
                    remote = true;
                    break;
            }

            if(list) {
                editor.execCommand('insertimage', list);
                remote && editor.fireEvent("catchRemoteImage");
            }
        };
    }