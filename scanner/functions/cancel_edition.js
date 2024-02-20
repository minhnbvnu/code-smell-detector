function cancel_edition(comment_id) {
    $('.comment_editing').css('background-color', '');
    $('.comment_editing').css('border-radius', '');
    $('.comment_editing').removeClass('comment_editing');
    $('.comment_editing').data('comment_id', '');
    $('#comment_edition').hide();
    $('#cancel_edition').hide();
    $('#comment_submit').show();
    g_comment_desc_editor.setValue('');
}