function refresh_ppl_list() {
    $('#ppl_list_viewing').empty();
    for (let [key, value] of ppl_viewing) {
        $('#ppl_list_viewing').append(get_avatar_initials(key, false, undefined, true));
    }
}