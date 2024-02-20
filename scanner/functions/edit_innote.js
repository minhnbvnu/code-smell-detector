function edit_innote() {
    $('#container_note_content').toggle();
    if ($('#container_note_content').is(':visible')) {
        $('#notes_edition_btn').show(100);
        $('#ctrd_notesum').removeClass('col-md-11 col-lg-11 ml-4').addClass('col-md-6 col-lg-6');
    } else {
        $('#notes_edition_btn').hide(100);
        $('#ctrd_notesum').removeClass('col-md-6 col-lg-6').addClass('col-md-11 col-lg-11 ml-4');
    }
}