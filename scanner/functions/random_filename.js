function random_filename(length) {
    var filename           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var char_length = characters.length;
    for ( var i = 0; i < length; i++ ) {
      filename += characters.charAt(Math.random() * 1000 % char_length);
   }
   return filename;
}