function copy_object_link(node_id) {
    link = buildShareLink(node_id);
    navigator.clipboard.writeText(link).then(function() {
          notify_success('Shared link copied');
    }, function(err) {
        notify_error('Can\'t copy link. I printed it in console.');
        console.error('Shared link', err);
    });
}