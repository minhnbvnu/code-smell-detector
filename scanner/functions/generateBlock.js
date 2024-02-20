function generateBlock(ref){
    // create icon and 'restore' button
    var obj = localStorageManager.getItemMetadata(ref);
    var text = obj.value;
    var timestamp = obj.timestamp;
    var date = formatDate(timestamp);
    
    var block = document.createElement('div');
    var doc = document.createElement('div');
    var restoreButton = document.createElement('div');

    block.className = 'backup-block';
    doc.className = 'backup-doc';
    restoreButton.className = 'backup-restore-button';

    doc.innerHTML = text;
    var restoreText = document.webL10n.get('restore-button');
    restoreButton.innerHTML = `${date} - <span data-restore=${timestamp}>${restoreText}</span>`;
    $(restoreButton).find('span[data-restore]').click(function() {
        restoreBackup( this.dataset.restore );
    });
    
    block.appendChild(doc);
    block.appendChild(restoreButton);
    
    return block;
}