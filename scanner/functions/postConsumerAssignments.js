function postConsumerAssignments(consumer, topicName, partitions) {
//    return deleteConsumerSubscriptions(consumer).then(function(responseDelete){
    var data = preparePartitionData(topicName, partitions);
    $log.debug(topicName, "2) ACTUAL PARTITIONS TO ASSIGN", data);
    var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/assignments';
    return HttpFactory.req('POST', url, data, CONTENT_TYPE_JSON, '', false, env.DEBUG_LOGS_ENABLED());
//    })
  }