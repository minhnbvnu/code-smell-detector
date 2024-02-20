function get_bsk_data(tbs){
    global.start = Date.now()
    global.UTSTART = start + 12350
    var mouse_pwd = get_mouse_pwd()
    var n = {"tbs":tbs};
    var t = {};
    _BSK.a("omzVouOACqkNljzDbdOB", {
        IN: n,
        OUT: t
    });
    console.log(t)
    return {
        'mouse_pwd': mouse_pwd,
        'mouse_pwd_t': start,
        'bsk': t['data']
    }
}