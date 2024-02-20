function populatePanel(){
    addDocsToPanel(0,8);
    if (listFiles().length === 0) {
        var noBackupsText = document.webL10n.get('no-backups');
        $('.backup-window').append( '<div class="no-backups">'+noBackupsText+'</div>' );
    }
}