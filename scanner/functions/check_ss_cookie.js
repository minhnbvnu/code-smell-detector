function check_ss_cookie() {
    var check_ss = readCookie('screenshot_ids');
    if (check_ss !== null) {
        $('.clear_ss_cookie').css({'outline': 'none',
                                  'background-image': "url('/css/images/ui-icons_70b2e1_256x240.png')"});
    } else {
        $('.clear_ss_cookie').css({'outline': 'none',
                                  'background-image': "url('/css/images/ui-icons_222222_256x240.png')"});
    }
}