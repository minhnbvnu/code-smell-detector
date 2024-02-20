function submitUrl(e) {
        e.preventDefault();

        const url = document.querySelector('#custom-filter-popup-url').value;
        const message = {
            type: 'loadCustomFilterInfo',
            url,
        };

        // pass title to the main if custom filter info exists
        // and custom filter info url equals to the url from the input (needed when user decides to update url)
        if (customFilterInfo.title && url === customFilterInfo.url) {
            message.title = customFilterInfo.title;
        }

        ipcRenderer.send('renderer-to-main', JSON.stringify(message));

        ipcRenderer.on('loadCustomFilterInfoResponse', (e, arg) => {
            if (arg) {
                renderConfirmFilterData(arg);
            } else {
                renderError();
            }
        });

        renderDownloadingFilter();
    }