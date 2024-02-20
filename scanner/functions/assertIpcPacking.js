function assertIpcPacking(msg, hexblob) {
  hexblob = hexblob.replace(/ /g, "");
  var packed = msg.pack();
  var buf = new ArrayBuffer(hexblob.length/2);
  var u8 = new Uint8Array(buf);

  for(var i = 0; i < hexblob.length; i+= 2) {
    u8[i/2] = parseInt(hexblob.substring(i, i+2), 16);
  }
  var u32 = new Uint32Array(buf);

  for(var i = 0; i < Math.max(packed.length, u32.length); i++) {
    if(i >= u32.length && packed[i] === 0) {
      continue; // forgive short templates
    }
    if(packed[i] != u32[i]) {
      utils.hexdump("packed", packed);
      utils.hexdump("template", buf);
      throw "IPC packing doesn't match";
    }
  }
  
  return true;
}