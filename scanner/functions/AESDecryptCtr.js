function AESDecryptCtr(ciphertext, password, nBits) {
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys

  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) pwBytes[i] = password.charCodeAt(i) & 0xff;
  var pwKeySchedule = KeyExpansion(pwBytes);
  var key = Cipher(pwBytes, pwKeySchedule);
  key = key.concat(key.slice(0, nBytes-16));  // key is now 16/24/32 bytes long

  var keySchedule = KeyExpansion(key);

  ciphertext = ciphertext.split('-');  // split ciphertext into array of block-length strings 

  // recover nonce from 1st element of ciphertext
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  var counterBlock = new Array(blockSize);
  var ctrTxt = unescCtrlChars(ciphertext[0]);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);

  var plaintext = new Array(ciphertext.length-1);

  for (var b=1; b<ciphertext.length; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b-1) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = ((b/0x100000000-1) >>> c*8) & 0xff;

    var cipherCntr = Cipher(counterBlock, keySchedule);  // encrypt counter block

    ciphertext[b] = unescCtrlChars(ciphertext[b]);

    var pt = '';
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintext with ciphered counter byte-by-byte --
      var ciphertextByte = ciphertext[b].charCodeAt(i);
      var plaintextByte = ciphertextByte ^ cipherCntr[i];
      pt += String.fromCharCode(plaintextByte);
    }
    // pt is now plaintext for this block

    plaintext[b-1] = pt;  // b-1 'cos no initial nonce block in plaintext
  }

  return plaintext.join('');
}