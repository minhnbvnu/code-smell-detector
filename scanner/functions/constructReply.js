function constructReply(data) {
  const json = JSON.stringify(data);
  const jsonByteLength = Buffer.byteLength(json);
  // 目前只支持小于65535字节的负载
  const lengthByteCount = jsonByteLength < 126 ? 0 : 2;
  const payloadLength = lengthByteCount === 0 ? jsonByteLength : 126;
  const buffer = Buffer.alloc(2 + lengthByteCount + jsonByteLength);
  // 设置数据帧首字节，设置opcode为1，表示文本帧
  buffer.writeUInt8(0b10000001, 0);
  buffer.writeUInt8(payloadLength, 1);
  // 如果payloadLength为126，则后面两个字节（16位）内容应该，被识别成一个16位的二进制数表示数据内容大小
  let payloadOffset = 2;
  if (lengthByteCount > 0) {
    buffer.writeUInt16BE(jsonByteLength, 2);
    payloadOffset += lengthByteCount;
  }
  // 把JSON数据写入到Buffer缓冲区中
  buffer.write(json, payloadOffset);
  return buffer;
}