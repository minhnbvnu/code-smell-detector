function post_add_patchup(elem, data) {
    elem.find('#id_value').val("");
    $('#object_box_container').parent().html(data.html);
    if (data.rel_made) {
        $('#relationship_box_container').parent().html(data.rel_msg);
    }
    //elem.parent().dialog( "close" );
}