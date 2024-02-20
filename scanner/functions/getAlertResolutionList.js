function getAlertResolutionList() {
    get_request_api('/manage/alert-resolutions/list')
        .then((data) => {
            if (!notify_auto_api(data, true)) {
                return;
            }
            alertResolutionList = data.data;
        });
}