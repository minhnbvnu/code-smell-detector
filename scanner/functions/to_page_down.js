function to_page_down() {
    // Get last element ID of the timeline
    let last_element_id = $('.timeline li:last > div').attr('id').replace('event_', '');

    // Scroll to the last element
    $('html').animate({ scrollTop: $('#event_'+last_element_id).offset().top - 80 });
}