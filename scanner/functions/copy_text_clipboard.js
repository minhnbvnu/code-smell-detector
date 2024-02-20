function copy_text_clipboard(data){
    navigator.clipboard.writeText(data).then(function() {
        notify_success('Copied!');
    }, function(err) {
        notify_error('Can\'t copy link. I printed it in console.');
        console.error(err);
    });
}