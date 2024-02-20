function getNotificationSagas() {
    //todo move table to be managed by THIS plugin
    let NotificationTemplate = require("../../models/notification-template");
    return new Promise(function (resolve, reject) {
        NotificationTemplate.findAll(true, true, function (templates) {
            resolve(templates.map((template) => {
                    let callCreateNotification = function (action) {
                        return template.createNotification(action.event_object);
                    };

                    return call(function* () {
                        yield takeEvery(sagaEventPattern(template.get('event_name')), callCreateNotification)
                    });
                })
            )
        })
    });
}