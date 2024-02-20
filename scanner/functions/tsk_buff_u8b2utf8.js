function tsk_buff_u8b2utf8(au8_buff) {
    try {
        var str = new String();
        var c_char;
        var i_length = au8_buff.byteLength == undefined ? au8_buff.length : au8_buff.byteLength;
        for (var i = 0; i < i_length; ) {
            c_char = au8_buff[i];
            if (c_char < 0x80) {
                str += String.fromCharCode(c_char); ++i;
            }
            else if ((c_char > 0xbf) && (c_char < 0xe0)) {
                str += String.fromCharCode(((c_char & 0x1f) << 6) | (au8_buff[i + 1] & 0x3f)); i += 2;
            }
            else {
                str += String.fromCharCode(((c_char & 0x0f) << 12) | ((au8_buff[i + 1] & 0x3f) << 6) | (au8_buff[i + 2] & 0x3f)); i += 3;
            }
        }
        return str;
    }
    catch (e) {
        tsk_utils_log_error(e);
        return tsk_buff_u8b2ascii(au8_buff);
    }
}