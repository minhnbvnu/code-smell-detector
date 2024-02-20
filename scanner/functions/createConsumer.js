function createConsumer(format, topicName, uuid) {
    $log.debug(topicName, "CREATING CONSUMER: ", getConsumer(format, uuid), uuid);
    var url = env.KAFKA_REST().trim() + '/consumers/' + getConsumer(format, uuid).group;
    var data = '{"name": "' + getConsumer(format).instance + '", "format": "' + format + '", "auto.offset.reset": "earliest", "auto.commit.enable": "false"}';
    return HttpFactory.req('POST', url, data, CONTENT_TYPE_JSON, '', true, env.DEBUG_LOGS_ENABLED());
  }