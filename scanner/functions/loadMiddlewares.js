function loadMiddlewares(
  ebMiddlewaresAll,
  ebMiddlewaresNormal,
  ebMiddlewaresGlobal,
  ebMiddlewaresSocketIoConnection,
  ebMiddlewaresSocketIoPacket
) {
  // load
  for (const item of ebMiddlewaresAll) {
    // ignore other types, such as: socketio.connection/socketio.packet
    const type = item.options.type;
    if (!type) {
      // normal
      ebMiddlewaresNormal[item.name] = item;
      if (item.options.global) {
        ebMiddlewaresGlobal.push(item);
      }
    } else if (type === 'socketio.connection') {
      ebMiddlewaresSocketIoConnection.push(item);
    } else if (type === 'socketio.packet') {
      ebMiddlewaresSocketIoPacket.push(item);
    }
  }

  // global order
  swap(ebMiddlewaresGlobal);
  swap(ebMiddlewaresSocketIoConnection);
  swap(ebMiddlewaresSocketIoPacket);
}