function tsk_buff_u8b2ascii(au8_buff) {
    // return Array.prototype.slice.call(au8_buff).join("");
    var str = new String();
    var i_length = au8_buff.byteLength == undefined ? au8_buff.length : au8_buff.byteLength;
    for (var i = 0; i < i_length; ++i) {
        str += String.fromCharCode(au8_buff[i] & 0xff);
    }
    return str;
}