function tmedia_type_from_id(i_id) {
    for (var key in tmedia_type_e) {
        if (tmedia_type_e[key].i_id == i_id) {
            return tmedia_type_e[key];
        }
    }
    return tmedia_type_e.NONE;
}