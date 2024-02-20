function add_update_log(message, is_error) {
    html_wrap = `<h4><i class="mt-2 fas fa-check text-success"></i>  `
    if (is_error) {
        html_wrap = `<h4><i class="mt-2 fas fa-times text-danger"></i> `
    }
    $("#updates_log").append(html_wrap + message + '</h4><br/>')
    $('html, body').animate({
        scrollTop: $("#updates_log_end").offset().top
    }, 50);
}