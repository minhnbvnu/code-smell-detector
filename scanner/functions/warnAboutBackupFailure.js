function warnAboutBackupFailure(){
    var backupWarningMessage = document.webL10n.get('backup-error');
    if (notYetWarned === true) {
        showMessage( backupWarningMessage );
        notYetWarned = false;
    }
}