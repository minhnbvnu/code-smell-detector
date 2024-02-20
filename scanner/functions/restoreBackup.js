function restoreBackup(timestamp){
    saveBackup();
    const restoreErrorMessage = document.webL10n.get('restore-error');
    try {
        var item = localStorageManager.getItem('oTranscribe-backup-'+timestamp);
        if ( item ) {
            var newText = item;
            setEditorContents(newText, {transition: true});
        } else {
            showMessage( restoreErrorMessage );
        }
    } catch (e) {
        showMessage( restoreErrorMessage );
    }
    closePanel();
}