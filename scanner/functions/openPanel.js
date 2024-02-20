function openPanel(){
    populatePanel();
    $('.backup-window').height( $('.textbox-container').height() * (3/5) );
    $('.backup-panel').fadeIn('fast');
}