function seekAll(beginningOrEnd, consumer, topicName) {
    $log.debug(topicName, "POLL STEPS START");
    return getPartitions(topicName).then(function (partitions) {
      $log.debug(topicName, '1) DONE: GOT ALL PARTITIONS', partitions);
      return postConsumerAssignments(consumer, topicName, partitions.data).then(function (r) {
        $log.debug(topicName, '3) DONE: ASSIGNED PARTITIONS TO CONSUMER');
        var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/positions/' + beginningOrEnd;
        var data = preparePartitionData(topicName, partitions.data);
        return HttpFactory.req('POST', url, data, CONTENT_TYPE_JSON, '', false, env.DEBUG_LOGS_ENABLED());
      })
    });
  }