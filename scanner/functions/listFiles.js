function listFiles(){
    var result = [];
    var ls = [];
    try {
        ls = localStorageManager.getArray();
    } catch (e) {
        console.error(e);
        console.error('Problem listing files from localStorage.');
        showMessage('Error listing files from localStorage. Manually clearing localStorage data may fix this. <a href="./help#why_is_otranscribe_is_no_longer_saving_backups">Instructions here</a>.');
        throw(e);
    }
    for (var i = 0; i < ls.length; i++) {
        if (ls[i].key.indexOf('oTranscribe-backup') > -1) {
            result.push( ls[i].key );
        }
    }
    return result.sort().reverse();
}