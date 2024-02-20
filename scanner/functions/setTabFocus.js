function setTabFocus(id) {
        if(!id) return;
        var i, bodyId, tabs = $G('tabhead').children;
        for (i = 0; i < tabs.length; i++) {
            bodyId = tabs[i].getAttribute('data-content-id');
            if (bodyId == id) {
                domUtils.addClass(tabs[i], 'focus');
                domUtils.addClass($G(bodyId), 'focus');
            } else {
                domUtils.removeClasses(tabs[i], 'focus');
                domUtils.removeClasses($G(bodyId), 'focus');
            }
        }
        switch (id) {
            case 'remote':
                remoteImage = remoteImage || new RemoteImage();
                break;
            case 'upload':
                setAlign(editor.getOpt('imageInsertAlign'));
                uploadImage = uploadImage || new UploadImage('queueList');
                break;
            case 'online':
                setAlign(editor.getOpt('imageManagerInsertAlign'));
                onlineImage = onlineImage || new OnlineImage('imageList');
                onlineImage.reset();
                break;
            case 'search':
                setAlign(editor.getOpt('imageManagerInsertAlign'));
                searchImage = searchImage || new SearchImage();
                break;
        }
    }