function getPartitions(topicName) {
    var url = env.KAFKA_REST().trim() + '/topics/' + topicName + '/partitions';
    return HttpFactory.req('GET', url, '', '', 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json', false, env.DEBUG_LOGS_ENABLED());
  }