function saveBackup(){
    // save current text to timestamped localStorageManager item
    var text = getTexteditorContents();
    var timestamp = new Date().getTime();
    localStorageManager.setItem('oTranscribe-backup-'+timestamp, text);
    // and bleep icon
    $('.sbutton.backup').addClass('flash');
    setTimeout(function(){
        $('.sbutton.backup').removeClass('flash');
    },1000);
    // and add to tray
    var newBlock = generateBlock('oTranscribe-backup-'+timestamp);
    newBlock.className += ' new-block';
    $('.backup-window').prepend( newBlock );
    $( newBlock ).animate({
        'opacity': 1,
        'width': '25%'
    },'slow',function(){
        $( newBlock ).find('.backup-restore-button').fadeIn();
    });
    trimBackupsToOneHundred();
}