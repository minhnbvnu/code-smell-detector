function toggle_max_editor() {
    $('#ctrd_notesum').toggle();
    if ($('#ctrd_notesum').is(':visible')) {
        $('#btn_max_editor').html('<i class="fa-solid fa-maximize"></i>');
        $('#container_note_content').removeClass('col-md-12 col-lg-12').addClass('col-md-12 col-lg-6');
    } else {
        $('#btn_max_editor').html('<i class="fa-solid fa-minimize"></i>');
        $('#container_note_content').removeClass('col-md-12 col-lg-6').addClass('col-md-12 col-lg-12');
    }
}