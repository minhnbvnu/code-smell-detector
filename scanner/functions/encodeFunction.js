function encodeFunction(encodedFrame, controller) {
  if (scount++ < 30) { // dump the first 30 packets.
    dump(encodedFrame, 'send');
  }
  if (currentCryptoKey) {
    const view = new DataView(encodedFrame.data);
    // Any length that is needed can be used for the new buffer.
    const newData = new ArrayBuffer(encodedFrame.data.byteLength + 5);
    const newView = new DataView(newData);

    const cryptoOffset = useCryptoOffset? frameTypeToCryptoOffset[encodedFrame.type] : 0;
    for (let i = 0; i < cryptoOffset && i < encodedFrame.data.byteLength; ++i) {
      newView.setInt8(i, view.getInt8(i));
    }
    // This is a bitwise xor of the key with the payload. This is not strong encryption, just a demo.
    for (let i = cryptoOffset; i < encodedFrame.data.byteLength; ++i) {
      const keyByte = currentCryptoKey.charCodeAt(i % currentCryptoKey.length);
      newView.setInt8(i, view.getInt8(i) ^ keyByte);
    }
    // Append keyIdentifier.
    newView.setUint8(encodedFrame.data.byteLength, currentKeyIdentifier % 0xff);
    // Append checksum
    newView.setUint32(encodedFrame.data.byteLength + 1, 0xDEADBEEF);

    encodedFrame.data = newData;
  }
  controller.enqueue(encodedFrame);
}