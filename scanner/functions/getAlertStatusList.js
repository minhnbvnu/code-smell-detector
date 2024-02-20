function getAlertStatusList() {
    get_request_api('/manage/alert-status/list')
        .then((data) => {
            if (!notify_auto_api(data, true)) {
                return;
            }
            alertStatusList = data.data;
        });
}