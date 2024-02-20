function ret_obj_dt_description(data) {
    let anchor = $('<span>');
    let dataContent = typeof data === 'object' ? JSON.stringify(data) : data;
    anchor.attr('data-toggle', 'popover')
        .attr('data-trigger', 'hover')
        .attr('title', 'Description')
        .attr('data-content', dataContent)
        .attr('href', '#')
        .css('cursor', 'pointer')
        .text(ellipsis_field_raw(data, 64));

    return anchor.prop('outerHTML');
}