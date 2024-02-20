function increase_modal_comments_count(element_type, element_id) {
    let tid = '#object_comments_number';
    if (element_type === 'timeline/events' || element_type === 'alerts') {
        tid = '#object_comments_number_' + element_id;
    }

    let curr_count = $(tid).text();
    if (curr_count === '') {
        curr_count = 0;
    }

    $(tid).text(parseInt(curr_count) + 1);
    if (element_type === 'timeline/events' || element_type === 'alerts') {
        $('#object_comments_number').text(parseInt(curr_count) + 1);
    }
}