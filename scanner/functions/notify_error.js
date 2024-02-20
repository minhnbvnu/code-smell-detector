function notify_error(message) {
    let p = $('<p>')
    p.text(message);
    let data = "";

    if (typeof (message) === typeof ([])) {
        for (element in message) {
            data += element
        }
    } else {
        data = message;
    }
    p.text(data)
    $.notify({
        icon: 'fas fa-triangle-exclamation',
        message: p.prop('outerHTML'),
        title: 'Error'
    }, {
        type: 'danger',
        placement: {
            from: 'bottom',
            align: 'left'
        },
        z_index: 2000,
        timer: 8000,
        animate: {
            enter: 'animated fadeIn',
            exit: 'animated fadeOut'
        }
    });
}