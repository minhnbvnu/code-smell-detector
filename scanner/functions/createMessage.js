function createMessage(data) {
  // Normalize enums to uppercase
  let type = data.type && data.type;
  if (type && type.startsWith('xviz/')) {
    type = type === 'xviz/metadata' ? 'metadata' : 'frame';
    data = data.data;
  } else {
    type = data.update_type ? 'frame' : 'metadata';
  }
  switch (type) {
    case 'metadata':
      writer.writeMetadata('', data);
      return dataSink.message;

    case 'frame':
      writer.writeFrame('', 1, data);
      return dataSink.message;

    default:
      return null;
  }
}