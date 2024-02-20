function personliazationNotificationSolution(i) {
    let title = i18n.__(notificationNamesList[i]), msg = i18n.__(notificationNamesList[i + 1]), random = 0;
    if (personalizationNotificationList[i].length > 0) {
        random = Math.floor(Math.random() * personalizationNotificationList[i].length);
        title = personalizationNotificationList[i][random];
        if (personalizationNotificationList[i + 1].at(random) !== undefined) {
            msg = personalizationNotificationList[i + 1][random];
        } else if (personalizationNotificationList[i + 1].length > 0) {
            random = Math.floor(Math.random() * personalizationNotificationList[i + 1].length);
            msg = personalizationNotificationList[i + 1][random];
        }
    } else {
        if (personalizationNotificationList[i + 1].length > 0) {
            random = Math.floor(Math.random() * personalizationNotificationList[i + 1].length);
            msg = personalizationNotificationList[i + 1][random];
        }
    }
    return [title, msg];
}