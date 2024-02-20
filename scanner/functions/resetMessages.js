function resetMessages(element) {
    var el = $(element);
    el.parent().removeClass('has-danger').removeClass('has-success')
    el.removeClass('form-control-danger').removeClass('form-control-success')
    el.next().text('');
}