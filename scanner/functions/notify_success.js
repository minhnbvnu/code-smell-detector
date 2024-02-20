function notify_success(message) {
    let p = $('<p>')
    p.text(message);
    $.notify({
        icon: 'fas fa-check',
        message: p.prop('outerHTML')
    }, {
        type: 'success',
        placement: {
            from: 'bottom',
            align: 'left'
        },
        z_index: 2000,
        timer: 2500,
        animate: {
            enter: 'animated fadeIn',
            exit: 'animated fadeOut'
        }
    });
}