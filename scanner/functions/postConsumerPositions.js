function postConsumerPositions(consumer, topicName, partition, offset, position) {

    switch (position) {
      case 'beginning':
        var data = {'partitions': [{'topic': topicName, 'partition': partition.partition}]};
        $log.debug(topicName, "3) SEEK PARTITION TO BEGINNING", data);
        var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/positions/beginning';
        return HttpFactory.req('POST', url, data, CONTENT_TYPE_JSON, '', true, env.DEBUG_LOGS_ENABLED());
        break;
      case 'end':
        var data = {'partitions': [{'topic': topicName, 'partition': partition.partition}]};
        $log.debug(topicName, "3) SEEK PARTITION TO END", data);
        var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/positions/end';
        return HttpFactory.req('POST', url, data, CONTENT_TYPE_JSON, '', true, env.DEBUG_LOGS_ENABLED());
        break;
      case 'offset':
        var data = {'offsets': [{'topic': topicName, 'partition': partition.partition, 'offset': offset}]};
        $log.debug(topicName, "3) SEEK TO OFFSETS", data);
        var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/positions';
        return HttpFactory.req('POST', url, data, CONTENT_TYPE_JSON, '', true, env.DEBUG_LOGS_ENABLED());
        break;
      default:
        $log.debug("Not a valid position", position)
    }
  }