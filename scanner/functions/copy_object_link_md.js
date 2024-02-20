function copy_object_link_md(data_type, node_id){
    let link = `[<i class="fa-solid fa-tag"></i> ${capitalizeFirstLetter(data_type)} #${node_id}](${buildShareLink(node_id)})`
    navigator.clipboard.writeText(link).then(function() {
        notify_success('MD link copied');
    }, function(err) {
        notify_error('Can\'t copy link. I printed it in console.');
        console.error('Shared link', err);
    });
}