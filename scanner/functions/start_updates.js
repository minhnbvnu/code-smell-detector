function start_updates(){
    $('#update_start_btn').hide();
    $('.update_start_txt').hide();
    $('#container-updates').show();
    update_socket.emit('update_get_current_version', { 'channel': channel });
    update_socket.emit('update_ping', { 'channel': channel });
//    index = 0;
//    while(index < 20) {
//        add_update_log('ping');
//        index += 1;
//    }
}