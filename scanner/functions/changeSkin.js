function changeSkin(show) {
    var skin = $('#select-skin').val().split('|');
    document.getElementById('skin').href = "Jbox/Skins" + (skin2 == true ? "2" : "") + "/" + skin[0] + "/jbox.css";
    $('.sel-skin').css('background-color', skin[1]);
    if (show) {
        $.jBox.tip('换肤成功，当前皮肤：' + skin[0], 'success');
    }
}