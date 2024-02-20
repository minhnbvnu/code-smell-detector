function preference_toggle(e) {
    e.preventDefault();
    var elem = $(e.currentTarget);
    log(elem);
    $.ajax({
        type: 'POST',
        data: '',
        url: elem.attr('action'),
        success: function(data) { ajaxPostSuccess(data,elem,e); }
    });
}