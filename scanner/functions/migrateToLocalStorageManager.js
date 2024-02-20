function migrateToLocalStorageManager(){
    // May 2015 - migration to localStorageManager
    if ( localStorage.getItem("autosave")) {        
       localStorageManager.setItem("autosave", localStorage.getItem("autosave") );
    }
    var backupList = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.indexOf('oTranscribe-backup') === 0) {
            var item = {
                value: localStorage.getItem( key ),
                timestamp: key.split('-')[2]
            };
            localStorage.setItem( 'localStorageManager_'+key, JSON.stringify(item) );
            localStorage.removeItem( key );
        }
    }
}