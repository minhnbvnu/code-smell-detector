function AESEncryptCtr(plaintext, password, nBits) {
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys

  // for this example script, generate the key by applying Cipher to 1st 16/24/32 chars of password; 
  // for real-world applications, a more secure approach would be to hash the password e.g. with SHA-1
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) pwBytes[i] = password.charCodeAt(i) & 0xff;
  var key = Cipher(pwBytes, KeyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // key is now 16/24/32 bytes long

  // initialise counter block (NIST SP800-38A §B.2): millisecond time-stamp for nonce in 1st 8 bytes,
  // block counter in 2nd 8 bytes
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  var counterBlock = new Array(blockSize);  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  var nonce = (new Date()).getTime();  // milliseconds since 1-Jan-1970

  // encode nonce in two stages to cater for JavaScript 32-bit limit on bitwise ops
  for (var i=0; i<4; i++) counterBlock[i] = (nonce >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = (nonce/0x100000000 >>> i*8) & 0xff; 

  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = KeyExpansion(key);

  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertext = new Array(blockCount);  // ciphertext as array of strings
  
  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // again done in two stages for 32-bit ops
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    var cipherCntr = Cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    
    // calculate length of final block:
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;

    var ct = '';
    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter byte-by-byte --
      var plaintextByte = plaintext.charCodeAt(b*blockSize+i);
      var cipherByte = plaintextByte ^ cipherCntr[i];
      ct += String.fromCharCode(cipherByte);
    }
    // ct is now ciphertext for this block

    ciphertext[b] = escCtrlChars(ct);  // escape troublesome characters in ciphertext
  }

  // convert the nonce to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);
  ctrTxt = escCtrlChars(ctrTxt);

  // use '-' to separate blocks, use Array.join to concatenate arrays of strings for efficiency
  return ctrTxt + '-' + ciphertext.join('-');
}