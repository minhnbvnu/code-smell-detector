function handleTLSerrors(err) {
      mqttClient.emit('error', err);
      connection.end();
   }