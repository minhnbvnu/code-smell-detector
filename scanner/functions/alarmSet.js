function alarmSet() {
    resetAlarm = setTimeout(function () {
        if (store.get('alarmtip') !== false && isAlarmDialogClosed && isAlarmTipOn) {
            if (win != null) {
                win.flashFrame(true);
                win.show();
                app.focus();
                isAlarmDialogClosed = false;
            }
            customDialog("on", i18n.__('alarm-for-not-using-wnr-dialog-box-title'), i18n.__('alarm-for-not-using-wnr-dialog-box-content'), "isAlarmDialogClosed = true;win.show();win.moveTop();alarmSet();");
        }
    }, 600000)//alarm you for using wnr
}