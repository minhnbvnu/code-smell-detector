function showStatus(message, spin) {
    $('div#replystatus').removeClass('errorMessage');
    $('div#replystatus').text(message);
    if (!message) {
        $('div#status').html('&nbsp;');
        return;
    }
    if (message == '') {
        $('div#status').html('&nbsp;');
        return;
    }
    $('div#status').removeClass('errorMessage');
    $('div#status').text(message);
    if (spin) {
        var img = '<img src="img/busy.gif" style="width:16px;height:9px;margin:0px 4px 0px 0px;" />';
        $('div#status').prepend(img);
        $('div#replystatus').prepend(img);
    }
}