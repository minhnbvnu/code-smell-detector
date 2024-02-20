function comment_reply_dialog(e) {
    $.proxy(update_dialog, this)(); // Copies over the parent reference and analyst
    $(this).find("#id_comment").val("");  // Give the user a blank slate..
}