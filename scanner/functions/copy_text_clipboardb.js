function copy_text_clipboardb(data){
    navigator.clipboard.writeText(fromBinary64(data)).then(function() {
        notify_success('Copied!');
    }, function(err) {
        notify_error('Can\'t copy link. I printed it in console.');
        console.error(err);
    });
}