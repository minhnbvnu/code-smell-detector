function tsk_buff_str2u8b(s_str) {
    var array = new Uint8Array(s_str.length);
    for (var i = 0; i < s_str.length; ++i) {
        array[i] = s_str[i].charCodeAt(0) & 0xff;
    }
    return array;
}