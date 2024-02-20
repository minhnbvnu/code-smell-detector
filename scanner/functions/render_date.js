function render_date(date, show_ms = false) {
    // Remove the timezone information and the ms
    let date_str = date.replace('T', ' ').replace('Z', '');
    if (!show_ms) {
        date_str = date_str.split('.')[0];
    } else {
        // remove nanoseconds
        date_str = date_str.split('.')[0] + '.' + date_str.split('.')[1].substr(0, 3);
    }

    return date_str;
}