function remindOfMediaFile( filename, filesource, filetime ){
    if (filename && filename !== '') {
        var lastfileText = document.webL10n.get('last-file');
        var lastfileText = 'File last used with imported document:';
        var restoreText = 'Restore';
        // if ((filesource) && (oTplayer.parseYoutubeURL(filesource))) {
        //     showMessage( lastfileText+' <a href="#" id="restore-media">'+filename+'</a>' );
        //     $('#restore-media').click(function(){
        //         oT.media.create({file: filesource, startpoint: filetime});
        //         return false;
        //     });
        // } else {
            showMessage(lastfileText+' '+filename);
        // }
    }
}