function hide_x_time_converter(item){
    $(`#${item}_date_convert`).hide();
    $(`#${item}_date_inputs`).show();
    $(`#${item}_date`).focus();
}